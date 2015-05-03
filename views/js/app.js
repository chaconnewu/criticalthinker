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
    registerEvents();
  }

  function registerEvents() {
    $('#pro .dropdown.icon').click(function(e) {
      // Preventing icon click, which will mess up the interface.
      e.stopPropagation();
    });
    $('#pro .claim.title').click(function(event) {
      var proClaimTitles = $('#pro .claim.title');
      var proClaimIndex = proClaimTitles.index(event.target);

      var conClaimTitles = $('#con .claim.title');
      var conClaimIndex = proClaimIndex;
      var classList = conClaimTitles[conClaimIndex].className.split(/\s+/);
      var whetherActive = false;
      for (var i = 0; i < classList.length; i += 1) {
        if (classList[i] === 'active') {
          whetherActive = true;
          break;
        }
      }
      if (whetherActive) {
        $(conClaimTitles[conClaimIndex]).accordion('close');
      } else {
        $(conClaimTitles[conClaimIndex]).accordion('open');
      }
    });

    $('#con .claim.title').click(function(event) {
      var conClaimTitles = $('#con .claim.title');
      var conClaimIndex = conClaimTitles.index(event.target);

      var proClaimTitles = $('#pro .claim.title');
      var proClaimIndex = conClaimIndex;
      var classList = conClaimTitles[proClaimIndex].className.split(/\s+/);
      var whetherActive = false;
      for (var i = 0; i < classList.length; i += 1) {
        if (classList[i] === 'active') {
          whetherActive = true;
          break;
        }
      }
      if (whetherActive) {
        $(proClaimTitles[proClaimIndex]).accordion('close');
      } else {
        $(proClaimTitles[proClaimIndex]).accordion('open');
      }
    });
  }

  function createTitle(argumentType) {
    var title = document.createElement('div');
    title.className = argumentType + ' ' + 'active title';

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

  function createFunctionButtons() {
    var row = document.createElement('div');
    row.className = 'row';

    var expandButton = document.createElement('div');
    expandButton.className = "ui tiny button";
    expandButton.appendChild(document.createTextNode('Expand'))

    var addButton = document.createElement('div');
    addButton.className = "ui tiny button";
    addButton.appendChild(document.createTextNode('Add'))

    var removeButton = document.createElement('div');
    removeButton.className = "ui red tiny button";
    removeButton.appendChild(document.createTextNode('Remove'))

    row.appendChild(expandButton);
    row.appendChild(addButton)
    row.appendChild(removeButton);

    return row;
  }

  // Supporting argument for claims
  function createSupport() {
    var title = createTitle("support");
    var content = createContent();

    var support = document.createDocumentFragment();
    support.appendChild(title);
    support.appendChild(content);

    return support;
  }

  // Pro or Con claims. Can contain multiple supporting argument.
  function createClaim() {
    var title = createTitle("claim");
    var buttons = createFunctionButtons();
    var content = createContent();
    var claim = document.createElement('div');
    var children = document.createElement('div');

    claim.className = 'ui styled accordion';
    children.className = 'accordion';

    children.appendChild(createSupport());
    children.appendChild(createSupport());
    content.appendChild(buttons);
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
      aceEditor.setHighlightActiveLine(false);
    }
  }

  function render() {
    var pro = $('#pro');
    var con = $('#con');

    pro.append(createClaim());
    pro.append(createClaim());
    con.append(createClaim());
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
        exclusive: false,
        duration: 200,
      });

      /**
       * collapse all claims and arguments
       */
      $('#callapseAllButton').click(function(e) {
        $('.claim.title').each(function(){
          $(this).accordion('close');
        });
      });
      $('#expandAllButton').click(function(e) {
        $('.claim.title').each(function(){
          $(this).accordion('open');
        });
      });

      // $(document).click(function(event) {
      //   var text = $(event.target).text();
      //   console.log(text);
      // });
    }
  }, 5);


}());

