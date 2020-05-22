document.addEventListener('DOMContentLoaded', function () {
    let lazyImgs = [].slice.call(document.querySelectorAll('lazy'));
    let active = false;

    const lazyLoad = () => {
        if ('IntersectionObserver' in window) {
            let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        const img = e.target;
                        img.src = img.dataset.src;
                        img.srcset = img.dataset.srcset;
                        img.classList.remove('lazy');
                        //这么恶心呢
                        observer.unobserve(img);
                    }
                });
            });
            lazyImgs.forEach(function (lazyImage) {
                //每个都加进去
                lazyImageObserver.observe(lazyImage);
            });
        }
        else {
            if (active === false) active = true;
            setTimeout(function () {
                lazyImgs.forEach(function (img) {
                    //innerHeight 上面的已经进入视野了
                    if (
                        img.getBoundingClientRect().top <= window.innerHeight &&
                        img.getBoundingClientRect().bottom >= 0 &&
                        getComputedStyle(img).display !== 'none'
                    ) {
                        img.src = img.dataset.src;
                        img.srcset = img.dataset.srcset;
                        img.classList.remove('lazy');
                        //这么恶心呢
                        lazyImgs = lazyImgs.filter(i => i !== img);

                        //还要在处理一下
                        if (lazyImgs.length === 0) {
                            document.removeEventListener('scroll', lazyLoad);
                            window.removeEventListener('resize', lazyLoad);
                            window.removeEventListener('orientchange', lazyLoad);
                        }
                    }
                });
                active = false;
            }, 0);
        }
    };

    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('lazyLoad', lazyLoad);
    window.addEventListener('orientchange', lazyLoad);
});
