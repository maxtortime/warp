/* global window, $, screenfull */

window.resizeSlides = (isDetail, $parent) => {
  const ZOOMING_RATIO = {
    elems: {
      h1: 0.1,
      h2: 0.08,
      h3: 0.07,
      h4: 0.06,
      h5: 0.05,
      h6: 0.045,
      p: 0.04,
      pre: 0.04,
      code: 0.04,
      span: 0.04,
      li: 0.04,
      ul: 0.04,
      ol: 0.04,
    },
    slide: 0.75,
    padding: 0.05,
    margin: 0.01,
  };

  const $slide = $parent.find('.slide');
  const $slidePane = $parent.find('.slide-pane');
  let $previewWidth;
  let previewWidthRatioApply;

  const $activeSlide = $('div.active');
  let fontRatio = $activeSlide.outerWidth() * ZOOMING_RATIO.slide;

  // slide selector, wrapper selector, margin
  if (isDetail) {
    // new (detail page)
    if (screenfull.isFullscreen) {
      $previewWidth = window.screen.height * 1.333333;
    } else {
      $previewWidth = $slidePane.outerWidth();
    }
    previewWidthRatioApply = $previewWidth * ZOOMING_RATIO.slide;
    $slide.outerHeight(previewWidthRatioApply);
    $slide.css('padding', `${$previewWidth * ZOOMING_RATIO.padding}px`);
  } else {
    // original (form page)
    $previewWidth = $('.preview').outerWidth();
    previewWidthRatioApply = $previewWidth * ZOOMING_RATIO.slide;
    $slide.css('margin', `${previewWidthRatioApply * 0.03}px`);
    $previewWidth = $('.slide').outerWidth();
    $slide.css('padding', `${$previewWidth * ZOOMING_RATIO.padding}px`);
    $slide.outerHeight($previewWidth * ZOOMING_RATIO.slide);
    fontRatio = $slide.outerWidth() * ZOOMING_RATIO.slide;
  }


  const resizeImg = (that, naturalWidth, previewWidth) => {
    let imageSize;
    if (naturalWidth > 700) {
      imageSize = 1;
    } else if (naturalWidth > 500) {
      imageSize = 0.8;
    } else if (naturalWidth > 300) {
      imageSize = 0.5;
    } else {
      imageSize = 0.3;
    }
    $(that).css('width', `${imageSize * previewWidth}px`);
  };

  const $img = $slide.find('p img');
  $img.each(function (index, element) {
    $(element).get(0).onload = function () {
      resizeImg(this, this.naturalWidth, $previewWidth);
    };
    resizeImg(element, this.naturalWidth, $previewWidth);
  });

  Object.keys(ZOOMING_RATIO.elems).forEach((elem) => {
    const $font = $slide.find(elem);
    $font.css('font-size', `${fontRatio * ZOOMING_RATIO.elems[elem]}px`);
    $font.css('margin-bottom', `${previewWidthRatioApply * ZOOMING_RATIO.margin}px`);
    $('.slide pre').css('padding', `${previewWidthRatioApply * 0.02}px`);
  });
};
