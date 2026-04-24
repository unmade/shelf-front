import { useCallback, useEffect, useState } from 'react';

import type { CarouselApi } from '@/ui/carousel';
import {
  Carousel,
  CarouselContent as CarouselViewport,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel';

import { useMediaItemsBrowserData } from '../contexts/data';

import { useGallery } from './context';
import { GallerySlide } from './slide';

export function GalleryContent() {
  const { data } = useMediaItemsBrowserData();
  const { startIndex, carouselApi, setCarouselApi, setPreviewedId } = useGallery();

  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const updateSlidesInView = useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setSlidesInView((currentSlides) => {
      if (currentSlides.length === api.slideNodes().length) {
        api.off('slidesInView', updateSlidesInView);
      }

      const inView = api.slidesInView().filter((index) => !currentSlides.includes(index));
      return currentSlides.concat(inView);
    });
  }, []);

  const handleSelect = useCallback(
    (api: CarouselApi) => {
      if (!api) {
        return;
      }

      const selectedIndex = api.selectedScrollSnap();
      const mediaItemId = data?.ids[selectedIndex];
      if (mediaItemId) {
        setPreviewedId(mediaItemId);
      }
    },
    [data?.ids, setPreviewedId],
  );

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    updateSlidesInView(carouselApi);
    carouselApi.on('slidesInView', updateSlidesInView);
    carouselApi.on('reInit', updateSlidesInView);
    carouselApi.on('select', handleSelect);

    return () => {
      carouselApi.off('slidesInView', updateSlidesInView);
      carouselApi.off('reInit', updateSlidesInView);
      carouselApi.off('select', handleSelect);
    };
  }, [carouselApi, updateSlidesInView, handleSelect]);

  if (!data) {
    return null;
  }

  return (
    <div className="h-full min-w-0 flex-1 bg-gray-50 px-8 inset-shadow-xs lg:px-20 dark:bg-zinc-950">
      <Carousel opts={{ startIndex, loop: true }} className="h-full w-full" setApi={setCarouselApi}>
        <CarouselViewport className="h-[calc(100svh-56px)]">
          {data.ids.map((id, index) => {
            const mediaItem = data.entities[id];
            if (!mediaItem) {
              return null;
            }

            return (
              <CarouselItem key={mediaItem.id} className="h-full">
                <GallerySlide mediaItem={mediaItem} inView={slidesInView.includes(index)} />
              </CarouselItem>
            );
          })}
        </CarouselViewport>
        <CarouselPrevious className="max-lg:hidden" />
        <CarouselNext className="max-lg:hidden" />
      </Carousel>
    </div>
  );
}
