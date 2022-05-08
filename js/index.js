window.onload = function () {
  var url = "data/task.json";
  var request = new XMLHttpRequest();
  request.open("get", url);
  request.send(null);
  request.onload = function () {
    if (request.status == 200) {
      var json = JSON.parse(request.responseText);
      console.log(json);
      let temp = document.getElementById("temp").innerHTML;
      let html = json
        .map((data) => {
          let result = temp
            .replace("{{cover}}", data.cover)
            .replace("{{avatar}}", data.avatar)
            .replace("{{name}}", data.name)
            .replace("{{badge}}", data.badge)
            .replace("{{likes}}", data.likes)
            .replace("{{views}}", data.views);
          return result;
        })
        .join("");
      document.querySelector(".main-list").innerHTML = html;
    }
  };
};
