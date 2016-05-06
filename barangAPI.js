//import dependencies
var express = require('express');
//create exress object
var app = express();
//import module
var fs = require("fs");
//melihat list barang yang terdapat pada database barang.json 
app.get('/listbarang', function (req, res) {
   fs.readFile( __dirname + "/" + "barang.json", 'utf8', function (err, data) {
   	  res.end(data);
   });
})
//menambahkan barang kedalam database melalui form
app.get('/addbarang', function (req, res) {
   res.sendFile( __dirname + "/" + "addbarang.html");
})
//fungsipenambahan  barang kedalam database
app.get('/addbarang_get', function (req, res) {
   fs.readFile( __dirname + "/" + "barang.json", 'utf8', function (err, data) {
   	   data = JSON.parse(data);
	   var latestid = 0;
	   //mencari id barang terakhir
   	   for(var produk in data){
   		  latestid = data[produk].id;
	   }
	   latestid = JSON.stringify(latestid);
	   latestid = parseInt(latestid) + 1;
	   //membuat objek barang yang akan ditambah
	   var produkbaru = {
	       				nama:req.query.nama,
	       				size:req.query.size,
	       				color:req.query.color,
	       				price:req.query.price,
	       				id:latestid
	       			  };
	   //memasukan data  barang baru kedalam database
	   data["produk"+latestid] = produkbaru;
	   res.end(JSON.stringify(data)); 
   });
  
})
//menghapus barang melalui form
app.get('/deletebarang', function (req, res) {
   res.sendFile( __dirname + "/" + "deletebarang.html");
})
//fungsi menghapus barang dari  database
app.get('/deletebarang_get', function (req, res) {
   fs.readFile( __dirname + "/" + "barang.json", 'utf8', function (err, data) {
   	   data = JSON.parse(data);
	   var deletedid = req.query.id;
	   //mencari dan menghapus barang  berdasarkan id
	   for(var produk in data){
   		  if(deletedid == data[produk].id) {
   		  	delete data[produk];
   		  }
	   }
	   res.end(JSON.stringify(data)); 
   });
  
})

//memfilter barang melalui form
app.get('/filterbarang', function (req, res) {
   res.sendFile( __dirname + "/" + "filterbarang.html");
})
//fungsi filter barang
app.get('/filterbarang_get', function (req, res) {
   fs.readFile( __dirname + "/" + "barang.json", 'utf8', function (err, data) {
   	   data = JSON.parse(data);
	   var size = req.query.size;
	   var color = req.query.color;
	   var min = req.query.min;
	   var max = req.query.max;
	   //mencari dan menghapus barang yang tidak sesuai
	   for(var produk in data){
	   	  if((data[produk].size != size) || (data[produk].color != color) || ((data[produk].price < min) && (data[produk] > max))) {
	   	  	delete data[produk];
   		  }
	   }
	   res.end(JSON.stringify(data)); 
   });
  
})
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("barangAPI listening at http://%s:%s", host, port)

})