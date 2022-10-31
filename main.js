toastr.options = {
    "closeButton": true,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
var addSerialNumber = function () {
    $('table tr').each(function (index) {
        $(this).find('td:nth-child(1)').html(index + 0);
    });
};
var rowIds = function () {
    var list = document.getElementsByClassName("col6");
    for (var i = 0; i < list.length; i++) {
        var m = i + 1;
        list[i].setAttribute("id", "ager-" + m);
        console.log("ager ids " + m)
    }
};
var age, age1;

function functionId(row) {
    var allempno = true;
    $('.empno').each(function () {
        var personno = $(this).val();
        if (isNaN(personno)) {
            allempno = true;
        }
        else {
            allempno = false;
        }
    });
    if (allempno) {
        document.getElementById('toast').innerHTML = toastr.error("Only Numeric Values allowed");
    }

}
function functionName(row) {
    var allname = true;
    var afullname = true;
    $('.name').each(function () {
        var personname = $(this).val();
        if (isNaN(personname)) {
            afullname = false;
        }
        else {
            afullname = true;
        }
        if (personname.length < 3) {
            allname = true;
        }
        else {
            allname = false;
        }
    });
    if (afullname) {
        document.getElementById('toast').innerHTML = toastr.error("Only Alphabetic Characters allowed");
    }
    if (allname) {
        document.getElementById('toast').innerHTML = toastr.error("Name should contain more than 3 letters");
    }
}
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
function functionEmail(row) {
    var allmail = true;
    $('.email').each(function () {
        var personmail = $(this).val();
        if (!filter.test(personmail)) {
            allmail = true;
        }
        else {
            allmail = false;
        }
    });
    if (allmail) {
        document.getElementById('toast').innerHTML = toastr.error("Please enter valid mail id");
    }
}
function functionPhone(row) {
    var allphone = true;
    var allmobile = true;
    $('.phone').each(function () {
        var personphone = $(this).val();
        if (isNaN(personphone)) {
            allphone = true;
        }
        else {
            allphone = false;
        }
        if (personphone.length < 10) {
            allmobile = true;
        }
        else {
            allmobile = false;
        }
    });
    if (allphone) {
        document.getElementById('toast').innerHTML = toastr.error("Only Numeric Values allowed");
    }
    if (allmobile) {
        document.getElementById('toast').innerHTML = toastr.error("Mobile Number should be minimum 10 numbers");
    }
}


var datedob = function (row) {
    $('.datebirth').daterangepicker({
        "dateFormat": "dd-mm-yyyy",
        "singleDatePicker": true,
        "showDropdowns": true,
        "showWeekNumbers": true,
        "alwaysShowCalendars": true,
        // "startDate": moment(),
        "opens": "left",
        "drops": "left",
        minYear: 1980,
        maxDate: moment()
        // maxYear: parseInt(moment().format('YYYY'),10)
    }, function (start) {
        var years = moment().diff(start, 'years');
        var months = moment().diff(start, 'month');
        age = (years + " yrs");
        age1 = (months + " M");
        var cough = row.parentNode.parentNode.rowIndex;
        console.log("This date row index no " + cough)
        if (years == 0) {
            document.getElementById('ager-' + cough).innerHTML = age1;
        }
        else {
            document.getElementById('ager-' + cough).innerHTML = age;
        }

    });
};

var check = function () {

    var allempty = true;
    $('.hide').each(function () {
        if ($(this).val() != '') {
            allempty = false;
        } else {
            allempty = true;
        }
    });

    if (allempty) {
        //this is empty
        document.getElementById('toast').innerHTML = toastr.error("Please fill the empty rows");
    }
    else {
        addRow();
    }

}
var addRow = function () {
    var t = $("#table1 tr").last().clone();
    t.find(".hide").each(function (i, element) {
        $(element).val("");
    });
    t.find(".reven").each(function (i, element) {
        $(element).val("");
    });
    t.find(".power").each(function (i, element) {
        $(element).val();
    });
    t.appendTo("#table1");
    $('#table1 tr:last td:nth-child(7)').empty();
    rowIds();
    addSerialNumber();
}

function deleteRow(row) {
    var i = row.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex;
    var rows = document.getElementById("table1").rows;
    console.log("current Row Index" + i)
    console.log("Rows Length" + rows.length)
    if (rows.length > 2) {
        document.getElementById('table1').deleteRow(i);
        addSerialNumber();
    }
    else {
        document.getElementById('toast').innerHTML = toastr.error("There should be minimum one row");
    }
    //Delete the Table row using it's Index.
}

var moveup = function (row) {
    var RowLocation = row.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex;
    var rows = document.getElementById("table1").rows;
    var parentNode = rows[RowLocation].parentNode;
    var f = RowLocation - 1;
    if (RowLocation == 1) {
        document.getElementById('toast').innerHTML = toastr.error("This is first row cant move up");
    }
    else {
        parentNode.insertBefore(rows[RowLocation], rows[RowLocation - 1]);
        addSerialNumber();
    }
    console.log("current Row Index" + RowLocation)
    console.log("before current Row Index" + f)
    console.log("Rows Length" + rows.length)
}
var movedown = function (row) {
    var RowLocation = row.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex;
    var rows = document.getElementById("table1").rows;
    let lastRow = rows.length - 1;
    var parentNode = rows[RowLocation].parentNode;
    var f = RowLocation - 1;
    if (RowLocation == lastRow) {
        document.getElementById('toast').innerHTML = toastr.error("This is last row cant move down");
    }
    else {
        parentNode.insertBefore(rows[RowLocation], rows[RowLocation + 1].nextSibling);
        addSerialNumber();
    }
    console.log("current Row Index" + RowLocation)
    console.log("Before current Row Index" + f)
    console.log("Rows Length" + rows.length)
    console.log("Last Row" + lastRow)
}
var checkAfter = function (row) {
    var allempty = true;
    $('.hide').each(function () {
        if ($(this).val() != '') {
            allempty = false;
        } else {
            allempty = true;
        }
    });

    if (allempty) {
        //this is empty
        document.getElementById('toast').innerHTML = toastr.error("Please fill the empty rows");
    }
    else {
        insertAfterrow(row);
    }
}
var insertAfterrow = function (row) {
    var i = row.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex;
    var tr = document.getElementById('table1').insertRow(i + 1);
    tr.innerHTML = row.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
    var inputs = tr.querySelectorAll("input[type ='text']");
    for (var i = 0; i < inputs.length; i++)
        inputs[i].value = "";
    console.log("insertrowafter " + i);
    tr.cells[6].innerHTML = " ";
    rowIds();
    addSerialNumber();
}
var checkBefore = function (row) {
    var allempti = true;
    $('.hide').each(function () {
        if ($(this).val() != '') {
            allempti = false;
        } else {
            allempti = true;
        }
    });

    if (allempti) {
        //this is empty
        document.getElementById('toast').innerHTML = toastr.error("Please fill the empty rows");
    }
    else {
        insertBeforerow(row);
    }
}
var insertBeforerow = function (row) {
    var i = row.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex;
    var tr = document.getElementById('table1').insertRow(i - 0);
    tr.innerHTML = row.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
    var inputs = tr.querySelectorAll("input[type ='text']");
    for (var i = 0; i < inputs.length; i++)
        inputs[i].value = "";
    tr.cells[6].innerHTML = " ";
    rowIds();
    addSerialNumber();
}