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
    console.log(proconData);
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

    render(proconData);
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

  function createTitle(content, argumentType) {
    var title = document.createElement('div');
    title.className = argumentType + ' ' + 'active title';

    var icon = document.createElement('i');
    icon.className = 'dropdown icon';

    title.appendChild(icon);
    title.appendChild(document.createTextNode(content.slice(0, 70) + ' ...'));

    return title;
  }

  function createContent(contentString) {
    var content = document.createElement('div');
    content.className = 'active content';

    // create Ace editor
    var editor = document.createElement('div');
    editor.className = "editor";
    editor.appendChild(document.createTextNode(contentString));

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

  function createFunctionIconsForClaim() {
    var row = document.createElement('div');
    row.className = 'row';

    var saveIcon = document.createElement('i');
    saveIcon.className = 'large save icon';

    var expandIcon = document.createElement('i');
    expandIcon.className = 'large expand icon'

    var addIcon = document.createElement('i');
    addIcon.className = 'large plus icon';

    var removeIcon = document.createElement('i');
    removeIcon.className = 'large red remove icon'

    row.appendChild(saveIcon);
    row.appendChild(expandIcon);
    row.appendChild(addIcon);
    row.appendChild(removeIcon);
    return row;
  }

  function createFunctionIoncsForSupport() {
    var row = document.createElement('div');
    row.className = 'row';

    var saveIcon = document.createElement('i');
    saveIcon.className = 'large save icon';

    var removeIcon = document.createElement('i');
    removeIcon.className = 'large red remove icon'

    row.appendChild(saveIcon);
    row.appendChild(removeIcon);
    return row;
  }

  // Supporting argument for claims
  function createSupport(supportContent) {
    var title = createTitle(supportContent);
    var content = createContent(supportContent);
    var icons = createFunctionIoncsForSupport();
    var support = document.createDocumentFragment();
    support.appendChild(title);
    content.appendChild(icons);
    support.appendChild(content);



    return support;
  }

  // Pro or Con claims. Can contain multiple supporting argument.
  function createClaim(claimRaw) {
    var title = createTitle(claimRaw.content, "claim");
    // var buttons = createFunctionButtons();
    var icons = createFunctionIconsForClaim();
    var content = createContent(claimRaw.content);
    var claim = document.createElement('div');
    var children = document.createElement('div');
    var i;

    claim.className = 'ui styled accordion';
    children.className = 'accordion';


    for (i = 0; i < claimRaw.support.length; i += 1) {
      children.appendChild(createSupport(claimRaw.support[i].content));
    }

    // content.appendChild(buttons);
    content.appendChild(icons);
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

  function render(proconData) {
    var pro = $('#pro');
    var con = $('#con');
    var i;
    // render pro
    for (i = 0; i < proconData.pro.length; i += 1) {
      // console.log(proconData.pro[i]);
      pro.append(createClaim(proconData.pro[i]));
    }

    // render con
    for (i = 0; i < proconData.con.length; i += 1) {
      con.append(createClaim(proconData.con[i]));
    }

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
      var data = proconModel.getProConData();
      proconView.init(data[0]);
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

