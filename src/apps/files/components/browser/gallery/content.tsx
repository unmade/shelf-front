import { useCallback, useEffect, useState } from 'react';
import type { CarouselApi } from '@/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel';

import { useFileBrowserData } from '../contexts/data';

import { useGallery } from './context';
import { GallerySlide } from './slide';

export function GalleryContent() {
  const { data } = useFileBrowserData();
  const { startIndex, carouselApi, setCarouselApi, setPreview } = useGallery();

  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const updateSlidesInView = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;

    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('slidesInView', updateSlidesInView);
      }
      const inView = emblaApi.slidesInView().filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  const handleSelect = useCallback(
    (api: CarouselApi) => {
      if (!api) {
        return;
      }

      const selectedIndex = api.selectedScrollSnap();
      const file = data?.entities[data?.ids[selectedIndex]];
      if (file) {
        setPreview(file.name);
      }
    },
    [data?.entities, data?.ids, setPreview],
  );

  useEffect(() => {
    if (!carouselApi) return;

    updateSlidesInView(carouselApi);
    carouselApi.on('slidesInView', updateSlidesInView);
    carouselApi.on('reInit', updateSlidesInView);
    carouselApi.on('select', handleSelect);

    return () => {
      carouselApi.off('select', handleSelect);
    };
  }, [carouselApi, updateSlidesInView, handleSelect]);

  return (
    <div className="h-full min-w-0 flex-1 bg-gray-50 px-8 inset-shadow-xs lg:px-20 dark:bg-zinc-950">
      <Carousel opts={{ startIndex, loop: true }} className="h-full w-full" setApi={setCarouselApi}>
        <CarouselContent className="h-[calc(100svh-56px)]">
          {Object.values(data?.entities ?? {}).map((file, index) => {
            return (
              <CarouselItem key={file.id} className="h-full">
                <GallerySlide file={file} inView={slidesInView.includes(index)} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="max-lg:hidden" />
        <CarouselNext className="max-lg:hidden" />
      </Carousel>
    </div>
  );
}
