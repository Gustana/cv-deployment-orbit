$(document).ready(function(){
  
  // -[Animasi Scroll]---------------------------
  
  $(".navbar a, footer a[href='#halamanku']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
        window.location.hash = hash;
      });
    } 
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;
      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });

  
  // -[Prediksi Model]---------------------------
  
  // Fungsi untuk memanggil API ketika tombol prediksi ditekan
  $("#prediksi_submit").click(function(e) {
    e.preventDefault();
	
	// Set data pengukuran bunga iris dari input pengguna
    var input_sepal_length = $("#range_sepal_length").val(); 
	var input_sepal_width  = $("#range_sepal_width").val(); 
	var input_petal_length = $("#range_petal_length").val(); 
	var input_petal_width  = $("#range_petal_width").val(); 

	// Panggil API dengan timeout 1 detik (1000 ms)
    setTimeout(function() {
	  try {
			$.ajax({
			  url  : "/api/deteksi",
			  type : "POST",
			  data : {"sepal_length" : input_sepal_length,
					  "sepal_width"  : input_sepal_width,
					  "petal_length" : input_petal_length,
					  "petal_width"  : input_petal_width,
			         },
			  success:function(res){
				// Ambil hasil prediksi spesies dan path gambar spesies dari API
				res_data_prediksi   = res['prediksi']
				res_gambar_prediksi = res['gambar_prediksi']
				
				// Tampilkan hasil prediksi ke halaman web
			    generate_prediksi(res_data_prediksi, res_gambar_prediksi); 
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
    }, 1000)
    
  })
    
  // Fungsi untuk menampilkan hasil prediksi model
  function generate_prediksi(data_prediksi, image_prediksi) {
    var str="";
    str += "<h3>Hasil Prediksi </h3>";
    str += "<br>";
    str += "<img src='" + image_prediksi + "' width=\"200\" height=\"150\"></img>"
    str += "<h3>" + data_prediksi + "</h3>";
    $("#hasil_prediksi").html(str);
  }

  //!code from dummy web
  $('#btn_explore').click(()=>{
    scrollToView($('.content_container')[0])
  })

  $('#btn_landing_section').click(()=>{
    scrollToView($('.landing_container')[0])
  })

  $('#btn_footer_section').click(()=>{
    scrollToView($('.footer')[0])
  })

  var slideImgFromLeft = {
    distance: '70%',
    origin: 'left',
    opacity: 0.2,
    duration: 2000,
    reset: true,
  };
  
  var slideImgFromRight = {
    distance: '40%',
    origin: 'right',
    opacity: 0.2,
    duration: 2000,
    reset: true,
  };
  
  var slideFruitNameFromRight = {
    distance: '30%',
    origin: 'right',
    opacity: 0,
    duration: 1000,
    delay:1500,
  };
  
  var slideFruitNameFromLeft = {
    distance: '30%',
    origin: 'left',
    opacity: 0,
    duration: 1000,
    delay:1500,
  };
  
  var slideFromBottom = {
    distance: '70%',
    origin: 'bottom',
    opacity: 0,
    duration: 2000,
    delay:2000,
  };
  
  reveal('.img_fruits_left', slideImgFromLeft)
  reveal('.fruits_name_right', slideFruitNameFromRight)
  
  reveal('.img_fruits_right', slideImgFromRight)
  reveal('.fruits_name_left', slideFruitNameFromLeft)
  
  reveal('.fruits_desc', slideFromBottom)
  
  
  //* hide navbar if landing page is visible
  document.addEventListener('scroll', ()=>{
    if(isInViewport($(".landing_container")[0])){
      $(".floating_btn").css('visibility', 'hidden')
      console.log('hide')
    }else{
      $(".floating_btn").css('visibility', 'visible')
      console.log('show')
    }
  
  })

  
})

function scrollToView(destination){
  destination.scrollIntoView()
  destination.scrollIntoView(true);
  destination.scrollIntoView({block: "start"});
  destination.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

function reveal(element, options){
  ScrollReveal().reveal(element, options)
}

function isInViewport(el) {
  
  var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || document.documentElement.clientWidth,
        vHeight  = window.innerHeight || document.documentElement.clientHeight,
        efp      = function (x, y) { return document.elementFromPoint(x, y) };     

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 
            || rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
          el.contains(efp(rect.left,  rect.top))
      ||  el.contains(efp(rect.right, rect.top))
      ||  el.contains(efp(rect.right, rect.bottom))
      ||  el.contains(efp(rect.left,  rect.bottom))
    );
}