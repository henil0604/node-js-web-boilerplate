(async () => {
    await (new $$.ToolBox()).delayer(1300);
    document.getElementsByTagName("h3")[0].innerHTML = await $$.request.post("/");
})()