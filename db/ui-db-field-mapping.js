const Sequelize = require("sequelize");
const db = require("../db/db-connection");
const TxnClosing = db.txn_closing;
var txnWriteDao = require("../dao/txn-write-dao");
const config = require("../config/app-config");


module.exports = {
    newProduct : function (req) {
        const data = {
            product_name: req.body.m_product_name_0,
            location_code: req.user.location_code,
            qty: req.body.m_product_qty_0,
            unit: req.body.m_product_unit_0,
            price: req.body.m_product_price_0,
            ledger_name:req.body.m_product_ledger_name_0,
            cgst_percent:req.body.m_product_cgst_0,
            sgst_percent:req.body.m_product_sgst_0,
            created_by: req.user.Person_id,
            updated_by: req.user.Person_id
        };
        return data;
    },
    newCredit : function (req) {
        const data = {
            Company_Name: req.body.m_credit_name_0,
            type: req.body.m_credit_type_0,
            address: req.body.m_credit_address_0,
            phoneno: req.body.m_credit_phoneno_0,
            gst: req.body.m_credit_gst_0,
            short_name: req.body.m_credit_short_name_0,
            Opening_Balance : 0,
            location_code: req.user.location_code,
            created_by: req.user.Person_id,
            updated_by: req.user.Person_id
        };
        return data;
    },
    newReceipt: function (req) {
        const data = {
            receipt_date: req.body.txn_receipt_date_0,
            receipt_no: req.body.creditreceiptno_0,
            creditlist_id : req.body.cr_companyId_0,
            receipt_type: req.body.cr_receiptType_0,
            amount: req.body.cramount_0,
            notes: req.body.crnotes_0,
            location_code: req.user.location_code,
            created_by: req.user.Person_id,
            updated_by: req.user.Person_id
        };
        return data;
    },
    newUser : function (req) {
        const data = {
            Person_Name: req.body.m_user_name_0,
            User_Name : req.body.m_user_username_0,
            Role: req.body.m_user_role_0,
            location_code: req.user.location_code,
            Password: 'welcome123',
            created_by: req.user.Person_id,
            updated_by: req.user.Person_id
        };
        return data;
    },
    changePwd: function (req) {
        const data = {
            Person_id: req.user.Person_id,
            Password: req.body.new_password
        };
        return data;
    },
    newTruckLoad: function (req) {
        const data = {
            invoice_date: req.body.txn_invoice_date_0,
            invoice_number: req.body.invoiceno_0,
            decant_date : req.body.txn_decant_date_0,
            decant_time: req.body.decanttime_0,
            location_id:req.body.decantloc_0,
            truck_id: req.body.truckno_0,
            odometer_reading:req.body.odometer_0,
            driver_id:req.body.driverid_0,
            helper_id:req.body.helperid_0,
            MS:req.body.MSQty_0,
            HSD:req.body.HSDQty_0,
            XMS:req.body.XMSQty_0,
            created_by: req.user.Person_id,
            updated_by: req.user.Person_id
        };
        
        return data;
    },
    newTruckExpense: function (req) {
        const data = {
            truck_id:req.body.truckno_0,
            expense_id:req.body.expenseType_0,
            costcenter_id:req.body.expcost_center_0,
            amount:req.body.expamount_0,
            qty:req.body.expqty_0,
            payment_mode:req.body.payment_mode_0,
            expense_date: req.body.txn_exp_date_0,
            notes: req.body.expnotes_0,
            created_by: req.user.Person_id,
            updated_by: req.user.Person_id
        };
        return data;
        
    },

    newBankTransaction: function (req) {
        const data = {
            trans_date: req.body.trans_date_0,
            bank_id:req.body.acctno_0,
            //location_id:req.body.location_id_0,
            credit_amount:req.body.creditamount_0,
            debit_amount:req.body.debitamount_0,
            transaction_type:req.body.trans_type_0,
            accounting_type:req.body.accnt_type_0,
            expense_date: req.body.txn_exp_date_0,
            remarks: req.body.banknotes_0,
            created_by: req.user.Person_id,
            updated_by: req.user.Person_id
        };
        return data;
        
    },
    newDeadlineData : function (req) {
        const data = {
            deadline_date: req.body.deadline_date_0,
            purpose: req.body.purpose_0,
            warning_day: req.body.warning_day_0,
            hard_stop: req.body.hard_stop_0,
            closed: req.body.closed_0,
            comment:req.body.comments_0,
            location_id: req.body.location_id,
            created_by: req.user.Person_id,
            updated_by: req.user.Person_id
        };
        return data;
    },
}
