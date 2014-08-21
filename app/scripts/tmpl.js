var todoTmpl = [
"<% _.each(todoItems, function(element, index, list) { %>",
  "<% if(element.active === 'false'){ %>",
    "<article data-todoid=\"<%= element._id%>\" class=\"displayInput done\">",
    "<p>",
    "<a href=\"\" class=\"check\"><i class=\"fa fa-check fa-2x green\"></i></a>",
    "<span class=\"textItem strike\">",
    "<%= element.item %>",
    "</span>",
  "<% } else{ %>",
    "<article data-todoid=\"<%= element._id%>\" class=\"displayInput active\">",
    "<p>",
    "<a href=\"\" class=\"check\"><i class=\"fa fa-check fa-2x\"></i></a>",
    "<span class=\"textItem\">",
    "<%= element.item %>",
    "</span>",
  "<% } %>",
  "<a href=\"\" class=\"ex hide\"><i class=\"fa fa-times fa-2x\"></i></a>",
"</p>",
"<form class=\"editListItem hidden\" name=\"editTodo\">",
  "<input type=\"text\" class = \"listEdit\" name=\"item\" value=\"<%= element.item %>\">",
  "<input type=\"submit\" value=\"Submit\" class=\"editSubmit\">",
"</form>",
"</article>",
"<% }); %>"

].join("\n")


var myCounter = [
  "<p class=\"counter\">",
  "<% var numAct = todoItems.length; %>",
  "<% for(var i = 0; i<todoItems.length;i++){ %>",
    "<%if(todoItems[i].active === 'false'){ %>",
      "<% numAct = numAct - 1; %>",
    "<%}",
  "<%}%>",
  "<% var textPlural  = ''; %>",
  "<% if(numAct == 0 || numAct > 1){ %>",
    "<% textPlural = ' items left'; %>",
  "<% }else if(numAct == 1){%>",
    "<% textPlural = ' item left'; %>",
    "<%}%>",
  "<% var bottomCount = numAct + textPl; %>",
  "<%= bottomCount %>",
  "</p>"
].join("\n")
