
// Edit closing flow: Enable pump reading entries based on selected pumps in first tab.
// Also update price under the sub-header element
function doubleCheckReadingPumps(obj) {
    if(obj) {
        trackMenu(obj);
    }
    calculateReadingsAndSale();
    updatePriceOnReadingTab(true);
}


function calculateReadingsAndSale() {
    const readingsContainer = document.getElementById('new_readings').querySelectorAll('[id$=_sub_header]');
    readingsContainer.forEach(container => {
       const uniquePump = container.id.replace('_sub_header', '');
       if(!container.className.includes('-none')) {
           calculatePumpSale(uniquePump);
       }
    });
}

function calculateAll2TProducts(obj) {
    if(obj) {
        trackMenu(obj);
    }
    const products = document.getElementById('sales_2t').querySelectorAll('[id$=_sale]');
    products.forEach(product => {
        const productTag = product.id.replace('_sale', '');
        calculate2TSale(productTag);
    });
}

function calculateTestings(obj) {
    if(obj) {
        trackMenu(obj);
    }
    const products = document.getElementById('new_testing').querySelectorAll('[id^=testing-lts]');
    products.forEach(product => {
        const productTag = product.id.replace('testing-lts-', '');
        calculateTestingAmount(productTag);
    });
}

function calculateCashSaleTotal() {
    calculateTotal('cash-sale-');
}

function calculateCreditTotal() {
    calculateTotal('credit-');
}

function calculateExpenseTotal() {
    calculateTotal('exp-');
}

function calculateExpensesAndDenoms(obj) {
    if(obj) {
        trackMenu(obj);
    }
    calculateExpenseTotal();
    calculateDenominations()
}

function trackMenuWithName(tabName) {
    trackMenu(document.getElementById(tabName));
}

function trackMenu(obj) {
    const previousSaveFun = document.getElementById('currentTabForSave').value;
    if(minimumRequirementForTabbing() || previousSaveFun === 'saveClosing' || previousSaveFun ==='saveDecantHeader') {
        const callSaveFunctionForMenu = getSaveFunction(obj.id);
        console.log("Previous save: " + previousSaveFun + ", current click(fn): " + callSaveFunctionForMenu);
        if (previousSaveFun === callSaveFunctionForMenu) {
            return;
        }
        if (previousSaveFun === 'NoSaveClick') {
            document.getElementById('currentTabForSave').value = callSaveFunctionForMenu;
        } else {
            ajaxLoading('d-md-block');
            window[previousSaveFun]().then((data) => {
                if (data) {
                    setSaveFunction(obj.id);
                    obj.click();
                }
                ajaxLoading('d-md-none');
            });
        }
    }
}

function setSaveFunction(clickedTab) {
    if(clickedTab) {
        document.getElementById('currentTabForSave').value = getSaveFunction(clickedTab);
    }
}

function getSaveFunction(clickedTab) {
    let saveFunctionName = undefined;
    const isFreezedRecordObj = document.getElementById('freezedRecord_hiddenValue');
    if(isFreezedRecordObj) {
        saveFunctionName = 'NoSaveClick';
        switch (clickedTab) {
            case 'cash_sales_tab':
            case 'credit_sales_tab':
            case 'closing_tab':
            case 'reading_tab':
            case 'sales_2t_tab':
            case 'expenses_tab':
            case 'summary_tab':
            case 'decantheader_tab':
            case 'decantlines_tab':
            case 'attendance_tab':
                saveFunctionName = 'NoSaveClick';   // dummy value
                break;
        }
    } else {
        switch (clickedTab) {
            case 'closing_tab':
                saveFunctionName = 'saveClosing';
                break;
            case 'reading_tab':
                saveFunctionName = 'saveReadings';
                break;
            case 'sales_2t_tab':
                saveFunctionName = 'save2TProducts';
                break;
            case 'cash_sales_tab':
                saveFunctionName = 'saveCashSales';
                break;
            case 'credit_sales_tab':
                saveFunctionName = 'saveCreditSales';
                break;
            case 'expenses_tab':
                saveFunctionName = 'saveExpensesAndDenoms';
                break;
            case 'summary_tab':
                saveFunctionName = 'NoSaveClick';   // dummy value
                break;
            case 'decantheader_tab':
                saveFunctionName = 'saveDecantHeader';
                break;
            case 'decantlines_tab':
                saveFunctionName = 'saveDecantLines';
                break;
            case 'attendance_tab':
                saveFunctionName = 'saveAttendance';   // dummy value
                break;
        }
    }

    return saveFunctionName;
}

function calculateAllInOnePlace() {
    return new Promise((resolve, reject) => {
        if(doubleCheckReadingPumps() ||
        calculateAll2TProducts() ||
        calculateCashSaleTotal() ||
        calculateCreditTotal() ||
        calculateExpensesAndDenoms()) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}

function populateSummaryFn(isFreezedRecord) {
    if(isFreezedRecord) {
        return populateSummary();
    } else {
        calculateCashflowDebitTotal();
        calculateCashflowCreditTotal();
        calculateDenominations();
    }
}

function disableOtherTabs(tabName) {
    switch(tabName) {
        case 'closing_tab':
            disableLink(document.getElementById('reading_tab'));
            disableLink(document.getElementById('sales_2t_tab'));
            disableLink(document.getElementById('cash_sales_tab'));
            disableLink(document.getElementById('credit_sales_tab'));
            disableLink(document.getElementById('expenses_tab'));
            disableLink(document.getElementById('summary_tab'));
            disableLink(document.getElementById('attendance_tab'));
            break;
        case 'expenses_tab':
            disableLink(document.getElementById('closing_tab'));
            disableLink(document.getElementById('reading_tab'));
            disableLink(document.getElementById('sales_2t_tab'));
            disableLink(document.getElementById('cash_sales_tab'));
            disableLink(document.getElementById('credit_sales_tab'));
            disableLink(document.getElementById('summary_tab'));
            disableLink(document.getElementById('attendance_tab'));
            break;
        case 'decantheader_tab':
            disableLink(document.getElementById('decantlines_tab'));
            disableLink(document.getElementById('summary_tab'));
            break;
    }
}

function enableOtherTabs(tabName) {
    switch(tabName) {
        case 'closing_tab':
            enableLink(document.getElementById('reading_tab'));
            enableLink(document.getElementById('sales_2t_tab'));
            enableLink(document.getElementById('cash_sales_tab'));
            enableLink(document.getElementById('credit_sales_tab'));
            enableLink(document.getElementById('expenses_tab'));
            enableLink(document.getElementById('summary_tab'));
            enableLink(document.getElementById('attendance_tab'));
            break;
        case 'expenses_tab':
            enableLink(document.getElementById('closing_tab'));
            enableLink(document.getElementById('reading_tab'));
            enableLink(document.getElementById('sales_2t_tab'));
            enableLink(document.getElementById('cash_sales_tab'));
            enableLink(document.getElementById('credit_sales_tab'));
            enableLink(document.getElementById('summary_tab'));
            enableLink(document.getElementById('attendance_tab'));
            break;
        case 'decantheader_tab':
            enableLink(document.getElementById('decantlines_tab'));
            enableLink(document.getElementById('summary_tab'));
            break;

    }
}

function changeEBflag(prefix,rownum){
    if(document.getElementById(prefix+'eb_' + rownum).checked){
        document.getElementById(prefix+'eb_' + rownum).value="Y"
    }
    else{
        document.getElementById(prefix+'eb_' + rownum).value="N"
    }

}

function changeHaltflag(){
    if(document.getElementById('halt_chk').checked){
        document.getElementById('halt_chk').value="Y"
    }
    else{
        document.getElementById('halt_chk').value="N"
    }

}

function disableDebitInput(rowNum){
    const amount=document.getElementById('creditamount_'+rowNum).value;
    if(amount>0){
        document.getElementById('debitamount_'+rowNum).disabled=true;
        document.getElementById('banktransaction-save').disabled = false;
    }
    if(amount==0 || amount== '')
        document.getElementById('debitamount_'+rowNum).disabled=false;
}

function disableCreditInput(rowNum){
    const amount=document.getElementById('debitamount_'+rowNum).value;
    if(amount>0){
        document.getElementById('banktransaction-save').disabled = false;
        document.getElementById('creditamount_'+rowNum).disabled=true;
    }
        
    if(amount==0 || amount== '')
        document.getElementById('creditamount_'+rowNum).disabled=false;
}

function validCreditDebit(){
    const cramount=document.getElementById('creditamount_'+0).value;
    const dbamount=document.getElementById('debitamount_'+0).value;
    if(cramount == 0 && dbamount == 0){
        document.getElementById('banktransaction-save').disabled = true;
        window.alert("Please enter Credit or Debit Amount");
    }
}

function changeCheckValue(prefix,rownum){

    if(document.getElementById(prefix + rownum).checked){
        document.getElementById(prefix+ rownum).value="Y"
    }
    else{
        document.getElementById(prefix+ rownum).value="N"
    }

}

function changeClosedValue(prefix,rownum){
    if(document.getElementById(prefix + rownum).checked){
        document.getElementById(prefix+ rownum).value="Y"
    }
    else{
        document.getElementById(prefix+ rownum).value="N"
    }
}
