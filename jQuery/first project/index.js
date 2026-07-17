

$("button").click(function() {
    $("h1").css("color", "purple")
})

$("a").attr("href", "https://www.yahoo.com")

$("body").keypress(function(event) {
    $("h1").text(event.key)
})

$("h1").on("mouseover", function() {
    $("h1").css("color", "red")
})