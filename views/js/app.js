var proconModel = (function($) {
  // Load procon data from server
  var proconData = {},
      dataReady = false;

  function fetchData() {
    $.ajax({
      url: "/all_procons"
    })
    .done(function(data) {
      dataReady = true;
      proconData = data;

    });
  }

  function init() {
    console.log('procon init');
    fetchData();
  }

  function addProCon() {

  }

  function addSupport() {

  }

  function deleteProCon() {

  }

  function deleteSupport() {

  }

  function getDataReady() {
    return dataReady;
  }

  function getProConData() {
    return proconData;
  }

  function updateServerProCon() {
    $.ajax({
      url: "/update_all_procons",
      data: proconData
    })
    .done(function() {

    });
  }

  return {
    init: init,
    addProCon: addProCon,
    addSupport: addSupport,
    deleteProCon: deleteProCon,
    deleteSupport: deleteSupport,
    getProConData: getProConData,
    getDataReady: getDataReady
  };
}(jQuery));


var proconView = (function($) {

  function init(proconData) {
    console.log('view init');
    console.log(proconData);

    render();
    renderAceEditor();
  }

  function createTitle() {
    var title = document.createElement('div');
    title.className = 'active title';

    var icon = document.createElement('i');
    icon.className = 'dropdown icon';

    title.appendChild(icon);
    title.appendChild(document.createTextNode('Pro claim'));

    return title;
  }

  function createContent() {
    var content = document.createElement('div');
    content.className = 'active content';

    // create Ace editor
    var editor = document.createElement('div');
    editor.className = "editor";
    // var editorID = 'ace' + Math.floor(Math.random()*1000);
    // editor.setAttribute('id', editorID);
    content.appendChild(editor);

    return content;
  }

  // Supporting argument for claims
  function createSupport() {
    var title = createTitle();
    var content = createContent();

    var support = document.createDocumentFragment();
    support.appendChild(title);
    support.appendChild(content);

    return support;
  }

  // Pro or Con claims. Can contain multiple supporting argument.
  function createClaim() {
    var title = createTitle();
    var content = createContent();
    var claim = document.createElement('div');
    var children = document.createElement('div');

    claim.className = 'ui styled accordion';
    children.className = 'accordion';
    children.appendChild(createSupport());
    content.appendChild(children);

    claim.appendChild(title);
    claim.appendChild(content);


    return claim;
  }

  function renderAceEditor() {
    var i;
    var elements = document.getElementsByClassName('editor');
    for (i = 0; i < elements.length; i += 1) {
      var aceEditor = ace.edit(elements[i]);
      aceEditor.getSession().setMode("ace/mode/text");
      aceEditor.getSession().setUseWrapMode(true);
      aceEditor.renderer.setShowGutter(false);
    }
  }

  function render() {
    var pro = $('#pro');
    var con = $('#con');

    pro.append(createClaim());
    con.append(createClaim());

  }

  return {
    init: init
  };
}(jQuery));


var proconController = (function () {
  proconModel.init();
  var interval = setInterval(function () {
    // console.log('set interval');

    if (proconModel.getDataReady() === true) {
      clearInterval(interval);
      proconView.init(proconModel.getProConData());
      $('.ui.accordion').accordion({
        exclusive: false
      });
    }
  }, 2);


}());

