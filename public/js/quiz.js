function getScore(){
    var normal_rate_val = document.querySelector('input[name="normal_rate"]:checked').value == 'Answer' ? true : false;
    var sleep_rate_val = document.querySelector('input[name="sleep_rate"]:checked').value == 'Answer' ? true : false;
    var slowest_rate_val = document.querySelector('input[name="slowest_rate"]:checked').value == 'Answer' ? true : false;
    var max_rate_val = document.querySelector('input[name="max_rate"]:checked').value == 'Answer' ? true : false;
    var fastest_rate_val = document.querySelector('input[name="fastest_rate"]:checked').value == 'Answer' ? true : false;
    var disease_val = document.querySelector('input[name="disease"]:checked').value == 'Answer' ? true : false;
    var disease2_val = document.querySelector('input[name="disease2"]:checked').value == 'Answer' ? true : false;
    var tf_val = document.querySelector('input[name="TF"]:checked').value == 'Answer' ? true : false;
    var score_val = 0
    if (normal_rate_val) {
        score_val += 1;
    }
    if (sleep_rate_val) {
        score_val += 1;
    }
    if (slowest_rate_val) {
        score_val += 1;
    }
    if (max_rate_val) {
        score_val += 1;
    }
    if (fastest_rate_val) {
        score_val += 1;
    }
    if (disease_val) {
        score_val += 1;
    }
    if (disease2_val) {
        score_val += 1;
    }
    if (tf_val) {
        score_val += 1;
    }
    alert("You answered " + score_val + " out of the 8 questions correctly.");

}