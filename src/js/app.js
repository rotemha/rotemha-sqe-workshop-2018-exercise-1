import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        //console.log(parsedCode);
        //$('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        $.each(parsedCode, function (key, obj) {
            var tr = $('<tr />');
            tr.append(`<td>${obj.line}</td><td>${obj.type}</td><td>${obj.name}</td><td>${obj.condition}</td><td>${obj.value}</td>`);
            $('#result_table tbody').append(tr);
        });
    });
});
