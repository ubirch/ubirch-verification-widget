# ubirch-verification-widget
Ubirch UPP Verification Widget

## Project structure

- `dist` - folder with Webpack build output
- `dist/blockchain-assets` - folder with configuration and icons for ubirch blockchain anchors
- `index.html` - verification usage instructions and examples
- `webpack.config.js` - Webpack configuration file
- `index.ts` - widget entry point

## Installing from NPM.

`npm i @ubirch/ubirch-verification-widget`

## Building from sources.

`npm install`

`npm run build:prod` This will bundle a js file for the browser into /dist directory.

## NPM scripts

### Build

Run on localhost

```
npm run serve:local
```

Build

```
npm run build:local
```

```
npm run build:prod
```

## Usage

### Prerequisites

You have anchored a JSON in the ubirch environment.

Attention:

1. params in the JSON have to be ordered alphabetically, no spaces
1. the widget will verify against the UBIRCH prod system per default (otherwise you need to set the stage in the constructor, see following instructions)

### widget's host element

Add a div tag to your html page in which the widget / the result of the verification will be displayed.
Specify id of that div and push that selector to the <code>elementSelector</code>
of the <code>UbirchVerification</code> constructor.

    <div id="verification-widget"></div>
    ...
    <script>
        const ubirchVerification = new UbirchVerification({
            ...
            elementSelector: '#verification-widget'
        });
        ...
    </script>

#### Example on Browser

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Ubirch Verification Widget</title>
</head>
<body>
      <div class="input-field">
        <label for="json-input">JSON:</label>
        <textarea rows="10" cols="80" placeholder="" type="text" id="json-input"></textarea>
      </div>
      <button id="verify-json">Verify JSON</button>

      <div id="verification-widget">


    <script src="../dist/ubirch-verification-widget.min.js"></script>
    <!--  Use this if installed from NPM -->
    <!--  <script src="../node_modules/@ubirch/ubirch-verification-widget/dist/ubirch-verification-widget.min.js"></script> -->
    <script>
      let ubirchVerification;
      document.addEventListener("DOMContentLoaded", function () {
        // create UbirchVerification instance
        ubirchVerification = new UbirchVerification({
          algorithm: 'sha256',
          elementSelector: '#verification-widget',
        });
      });

      // verify JSON button click listener
      document.getElementById('verify-json').addEventListener('click', function() {
        try {
        ubirchVerification.verifyJSON(document.getElementById('json-input').value);
        } catch (e) {
          // handle the error yourself and inform user about the missing fields
          msg = "JSON Verification failed!\n";
          window.alert(msg);
        }
      });
    </script>
</body>
</html>
```

### <code>UbirchVerification</code> instance

    const ubirchVerification = new UbirchVerification({
        algorithm: 'sha512',
        elementSelector: '#verification-widget',
        state: 'demo',  // OTIONAL!!
        language: 'en',  // OPTIONAL!!
        HIGHLIGHT_PAGE_AFTER_VERIFICATION: true  // OPTIONAL!!
    });


Where:
* <code>algorithm</code> is hashing algorithm you need (possible values: <code>sha256</code>, <code>sha512</code> )
* <code>elementSelector</code> is widget's host element selector (id), e.g. <code>#verification-widget</code>
* <code>stage</code> optional param to set UBRICH stage against which widget tries to verify;
  currently available: 'dev'/'demo'/'prod'/'local';
  default stage is 'prod'
* <code>language</code> optional param to set language of widget strings; currently available: 'de'/'en';
  default language is 'de'
* <code>HIGHLIGHT_PAGE_AFTER_VERIFICATION</code> optional param, if set to true the whole page will be highlighted
  green or red for a short time interval depending on success or failure of the verification;
  done by changing the style of the <main> HTML element on the page:
  classes 'flashgreen' or 'flashred' (need to be defined in css of the page!) are added and removed after some seconds;
  default: false

### Verify JSON

If you have the anchored JSON (generated yourself or by using <code>createJsonFromInputs</code>, see below)
you can verify the JSON by

    verifyJSON( {{ your JSON }} )

Hint: the params of the JSON do not need to be alphabetically ordered here,
but before hashing the JSON they will be ordered and trimmed.

So, if you anchor a document manually be sure to ordered the params in the JSON alphabetically
and remove all spaces.

Hint: historically some things are anchored in a JSON without alphabetically ordered params.
In this case structure the JSON as it is anchored and call it with optional sort param:

    verifyJSON( {{ your JSON }}, false )


### Verify hash

You can verify the hashed JSON directly by

    verifyHash( {{ your hash }} )

Attention: use the hashing algorithm defined in the UbirchVerification constructor's <code>algorithm</code> field

### Helper: Sort and trim JSON

Helper function to sort (recursively, if not prevented) and trim JSON

    ubirchVerification.formatJSON( {{ jsonStr JSON }}, {{ sortorder boolean = true }});

Where:
* <code>jsonStr</code> is the JSON e.g. in prettyprint format and keys in any order
* <code>sortorder</code> Optional! Default: true; set to false if the keys should not be sorted (recursively)

THis function is called from verifyJSON.
This call can be used for debugging or testing to check which string is generated from given JSON data
before hashing and verifying.

### Generate hash from JSON

Helper function to generate hash from JSON (for debugging or testing).

    ubirchVerification.createHash( {{ jsonStr JSON }} );

Before hashing the params of the JSON will be ordered and trimmed by calling <code>ubirchVerification.formatJSON</code>.
Then the JSON will be hashed with the hash algorithm defined in
ubirchVerification constructor's <code>algorithm</code> field

### Set text message

Beneath setting the language of the widget you can set an individual message:

    ubirchVerification.setMessageString( {{ key }}, {{ info text }}, {{ header (optional) }} )

Example:

      ubirchVerification.setMessageString('FAIL',
        'No blockchain anchor for given data\nPlease check your inserted data', 'Verification Failed!');

Keys:

* PENDING
* SUCCESS
* FAIL
* CERTIFICATE_DATA_MISSING
* VERIFICATION_FAILED
* CERTIFICATE_ID_CANNOT_BE_FOUND
* VERIFICATION_FAILED_EMPTY_RESPONSE
* VERIFICATION_FAILED_MISSING_SEAL_IN_RESPONSE
* UNKNOWN_ERROR

## Ubirch Form Verification

There is a convenient SubClass ubirchFormVerification for a verification based on a form with input fields.
It's also part of the verification.js lib.
It provides following functionality:

* get params as string from fragment OR - if no fragment set - from query of url
* insert params into form fields
* check if form fields are filled
* Create JSON certificate from form fields

### Insert verification.js

Same as for UbirchVerification widget

### Create a <code>UbirchFormVerification</code> instance

    const ubirchFormVerification = new UbirchFormVerification({
      algorithm: 'sha512',
      elementSelector: '#verification-widget',
      state: 'demo',  // OTIONAL!!
      language: 'en',  // OPTIONAL!!
      HIGHLIGHT_PAGE_AFTER_VERIFICATION: true  // OPTIONAL!!

      formIds: ["pid", "tid", "td", "tt", "tr"]
      paramsFormIdsMapping: ["probenId", "testId", "testDate", "testTime", "testResult"],  // OPTIONAL!!
      CHECK_FORM_FILLED: false  // OPTIONAL!!
    });

Params:

Same as for UbirchVerification widget. Additional:

* <code>formIds</code> string array with param ids used in the anchored JSON
  - here the id's can be added in any order; attention: in the anchored JSON document the id's have to be in alphabetical order!
  - attention: you must not use id "id" (TYPO3 uses this id for routing and ignores query string if it contains an id "id")

* <code>paramsFormIdsMapping</code> optional param, used if query/fragment params need to be mapped on form field ids
  - historical reasons e.g. needed if form is called from a QR code with url params for the form
    BUT the param names are different from the JSON params that are anchored
  - the formIds are mapped to the paramsFormIdsMapping at the array index ->
    formIds and paramsFormIdsMapping have to have the same length

* <code>CHECK_FORM_FILLED</code> optional param
  - default: true; if NOT set the form is checked for that all fields are filled and verification is not processed
    and user gets informed about the missing fields
  - if set to false no check is performed and verification is processed with incomplete data

### create form

Create a form on the page with input fields for the params of the verification document.
For every required param define an input field; set the param id as id of the input:

Example:

    {"did":"1a0dca1f-caf8-4776-bda9-909b4d9b6b1f","fn":"Max","ln":"Mustermann","d":"2019-06-12","v":"3.25"}


    <div class="input-field">
      <input type="text" id="did">
      <label for="did">DocumentID:</label>
    </div>
    <div class="input-field">
      <input type="text" id="fn">
      <label for="fn">Firstname:</label>
    </div>
    <div class="input-field">
      <input type="text" id="ln">
      <label for="ln">Lastname:</label>
    </div>
    ...

### get params from fragment OR query of url (optional)

* Tries to read params from curl as a string
* IF fragment is given the params are read from fragment
* IF NO fragment is given the params are tried be read from query string
* pattern:
  <code>IDNAME1=PARAMVALUE1&IDNAME2=PARAMVALUE2&...</code>

Call:

        var paramStr = ubirchFormVerification.getFormParamsFromUrl(window);

### Insert params into form (optional)

If you want to insert given params (test data as string OR read from url) into form fields you can call <code>setDataIntoForm</code>:

    const paramStr = "pid=9ceb5551-d006-4648-8cf7-c7b1a1ddccb1&tid=FGXC-CL11-KDKC-P9XC-74MM&td=2020-06-12&tt=11:00:00&tr=negativ";
    ubirchFormVerification.setDataIntoForm(paramStr, document);

You can add an optional parameter to define the separator e.g. if you get params from fragment.
The whole string is search in the paramStr, so you can e.g. define "%SEP%" as the separator between params.
Default is "&" which is the normal separator for query params.

    const paramStr = "pid=9ceb5551-d006-4648-8cf7-c7b1a1ddccb1;tid=FGXC-CL11-KDKC-P9XC-74MM;td=2020-06-12;tt=11:00:00;tr=negativ";
    ubirchFormVerification.setDataIntoForm(paramStr, document, ';');

In addition if your call contains normal text - possibly containing commas -
please set the second optional parameter to define a custom separator to divide array elements given in the url query or fragment;
default is "," but this can lead into problems if normal text - possibly containing commas - has been anchored

    ubirchFormVerification.setDataIntoForm(paramStr, document, ';', '%NXT%');

### Generate JSON from input fields

If you have a form with input fields for all params you can create the JSON document by calling
<code>getJsonFromInputs</code>.

* in the created JSON all params are put together that are defined in constructors
  <code>formIds</code> parameter
* the values are taken from the input fields with the same id
* checks if form is filled completely; throws an <code>IUbirchFormError</code>, if any fields are empty
* <code>IUbirchFormError.missingIds</code> contains a list of all missing ids
* handle the error yourself and inform user about the missing fields
* if no error occurs the created JSON is returned;
  then you can verify the JSON by <code>verifyJSON</code> in a separate step.


        try {

          const genJson = ubirchFormVerification.getJsonFromInputs(document);
          ubirchFormVerification.verifyJSON( genJson );

        } catch (e) {
            e.missingIds.forEach(
                id => // handle missing field
            );
        }


## Widget Configuration

### Environment Settings

In the environments the following settings should be set:

- `verify_api_url` - Server URL for the verification request for every stage (local, dev, demo, prod)
- `console_verify_url` - Server URL to open details in the console web app verification page for every stage (local, dev, demo, prod)

### How To Add New Blockchains

1. Add new Blockchain settings to the `blockchain-assets/blockchain-settings.json`:


    "new-blx-name": {
      "nodeIcon": "new-blx_verify_right.png",
      "explorerUrl": {
         "testnet": {
           "url": "https://blockexplorer.new-blx-name.org/tx/path-to-testnet"
         },
         "mainnet": {
           "url": "https://blockexplorer.new-blx-name.org/tx/path-to-mainnet"
         }
       }
    },

2. Add new Blockchain icon to the folder `blockchain-assets/blockchain-icons`
3. Add require statement for the new Blockchain icon in the index.ts:


    const icons: Map<string, any> = new Map([
      ['ubirch_verify_right.png', require('../blockchain-assets/blockchain-icons/ubirch_verify_right.png')],
      ['ubirch_verify_wrong.png', require('../blockchain-assets/blockchain-icons/ubirch_verify_wrong.png')],
      ...
      ['blx_verify_right.png', require('../blockchain-assets/blockchain-icons/blx_verify_right.png')],
    ]);
