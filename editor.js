var selfArchive = ''
var state = ''
var commitCounter = 0

function initializeSaving() {
  if (window.hasOwnProperty('DatArchive')) {
    selfArchive = new DatArchive('' + window.location)
    state = (document.getElementById('pageContent')).outerHTML
    commitCounter = 0
  }
}

async function save() {
  // Check if state is stale.
  let saveButton = document.querySelector('#saveButton');
  saveButton.innerText = 'SAVING...'
  saveButton.disabled = true
  let page = (document.getElementById('pageContent')).outerHTML
  await selfArchive.writeFile('/index.html', templateTop + state + templateBottom, 'utf8')
  saveButton.innerText = 'SAVE'
  saveButton.disabled = false 
}

async function publish() {
  let publishButton = document.querySelector('#publishButton');
  saveButton.innerText = 'PUBLISHING...'
  saveButton.disabled = true
  await selfArchive.commit()
  saveButton.innerText = 'PUBLISH'
  saveButton.disabled = false
}

var editor;
CKEDITOR.on('instanceReady', function(ev) {
    editor = ev.editor;
    // you can also add more config for this instance of CKE here
    // e.g. editor.setReadOnly(false);
});
function edit() {
  // Turn off automatic editor creation first.
  // CKEDITOR.disableAutoInline = true;
  // CKEDITOR.allowedContent = true 
  /*
  CKEDITOR.allowedContent = {
    "tangerine-section": true
  }
  */
  let content = document.querySelector('#pageContent');
  let editButton = document.querySelector('#editButton');
  let saveButton = document.querySelector('#saveButton');
  if (content.contentEditable == "true") {
    content.contentEditable = "false"
    editor.destroy();
    editButton.innerText = "EDIT"
    saveButton.disabled = false 
  } else {
    content.contentEditable = "true"
    CKEDITOR.inline( 'pageContent' );
    editButton.innerText = "PLAY"
    saveButton.disabled = true 
  }
}

var templateTop = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Tangy Beaker</title>
        <script src="ckeditor/ckeditor.js"></script>
        <script src="editor.js"></script>
        <script src="/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
        <link rel="import" href="/bower_components/polymer/polymer.html">
        <link rel="import" href="/bower_components/tangy-form/tangy-form.html">
        <link rel="import" href="/bower_components/tangy-section/tangy-section.html">
        <link rel="import" href="/bower_components/tangy-hide-if/tangy-hide-if.html">
    </head>
    <body onload="initializeSaving()">
      <button id="editButton" onclick="edit()">
				EDIT
			</button>
      <button id="saveButton" onclick="save()">
        SAVE
      </button>
      <button id="publishButton" onclick="publish()">
        PUBLISH 
      </button>
` 

var templateBottom = `
    </body>
</html>
`

