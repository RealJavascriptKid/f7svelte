<script>
    import {Swiper,SwiperSlide } from 'framework7-svelte';
    export let addMessage;
	export let images;
	

    function onSelect(e){
		let val;
		try{
			val = e.detail[0][0].clickedSlide.dataset.value;
		}catch(ex){
			return;
		}
        console.log("image selected",val)
        addMessage(val)
    }

</script>

<style>
	:global(.swiper-slide) {
	  background: #fff;
	  text-align: center;
	  font-size: 18px;
	  line-height: 200px;
	  height: 200px;
	  box-sizing: border-box;
	  border: 1px solid #ccc;
	}

	.img {
		object-fit: cover;
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		}
	

  </style>


    <Swiper pagination navigation  slidesPerView={3} spaceBetween={20} 
		on:click={onSelect}>
		{#each images as image (image.value)}
		<SwiperSlide data-value={image.value}>
			<div style="width:100%;height:100%">
				<img class="img"			
				src={image.src}
				alt={image.text}
				id={image.value}
				/>
			</div>					
			
		</SwiperSlide>
	   {/each}	
    </Swiper>
