// Copyright (c) 2019, MIT and contributors
// For license information, please see license.txt

frappe.ui.form.on('Pengembalian', {
	id_pinjaman: function (frm) {
        frm.doc.data_pengembalian = []
        if (frm.doc.id_pinjaman) {
            frappe.call({
                method: "frappe.client.get",
                args: {
					doctype: "Pinjaman",
					name: frm.doc.id_pinjaman
                },
                callback: function (r) {
                    if (r.message) {
                        for (var row in r.message.data_pinjaman) {
                            var child = frm.add_child("data_pengembalian");
                            frappe.model.set_value(child.doctype, child.name, "code_buku",
                                r.message.data_pinjaman[row].code_buku);
                            frappe.model.set_value(child.doctype, child.name, "nama_buku",
                                r.message.data_pinjaman[row].nama_buku);
                            frappe.model.set_value(child.doctype, child.name, "tipe_buku",
                                r.message.data_pinjaman[row].tipe_buku);
                        }
                    } 
                    frm.refresh_field('data_pengembalian')
                }
            })
        }
    }
});


cur_frm.set_query('id_pinjaman', function() {
	return{
		filters: [
			['Pinjaman', 'status', '=', 'On	Borrow']
		]
	}
});
