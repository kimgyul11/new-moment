import useBestMoment from "@/components/home/hooks/useBestMoment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "@/styles/colorPalette";

import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
function Carousel() {
  const { data } = useBestMoment();
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  const navigate = useNavigate();
  return (
    <Container>
      <Swiper
        pagination={pagination}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        centeredSlides={true}
        navigation={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        css={swiperContainer}
      >
        {data?.map((moment) => (
          <SwiperSlide
            key={moment.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/moments/${moment.id}`)}
          >
            <img src={moment.image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

const Container = styled.div``;
const swiperContainer = css`
  width: 100%;
  height: 370px;
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-pagination-bullet {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }

  .swiper-pagination-bullet-active {
    color: ${colors.white};
    background: ${colors.blue500};
  }
  .swiper-pagination-horizontal {
  }
`;

export default Carousel;
