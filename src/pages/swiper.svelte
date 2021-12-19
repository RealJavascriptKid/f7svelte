<Page>
  <Navbar title="About" backLink="Back" />
  
  <Swiper navigation speed={500} slidesPerView={3} spaceBetween={20}>
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
    <SwiperSlide>Slide 4</SwiperSlide>
    <SwiperSlide>Slide 5</SwiperSlide>
    <SwiperSlide>Slide 6</SwiperSlide>
  </Swiper>


</Page>
<script>
  import { Page, Navbar, Swiper, SwiperSlide } from 'framework7-svelte';
</script>
<style>
:global(.swiper-slide) {
    background: #fff;
    text-align: center;
    font-size: 18px;
    line-height: 200px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }
  </style>