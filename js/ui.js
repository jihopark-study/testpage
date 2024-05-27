
$(function(){

	/* 요소별 */
	if( $('.footer_container').length ){
		_SECRETMALL_.layout.footer.init();
	}
	if( $('.prdList_type01 .p_content .priceBox .price_in .won').length ){
		_SECRETMALL_.toggleOpen.whole('.prdList_type01 .p_content .priceBox .price_in .won', '.price_in');
		_SECRETMALL_.autoClose('.prdList_type01 .p_content .priceBox .price_in');
	}
	if( $('.selectBox01').length ){
		_SECRETMALL_.selectBox.default.init('.selectBox01');
	}
	if( $('.selectBox02').length ){
		_SECRETMALL_.selectBox.default.init('.selectBox02');
	}
	if( $('.lawList_type01').length ){
		_SECRETMALL_.toggleOpen.whole('.lawList_type01 .l_item .l_content .btnOpen', '.l_item');
	}
	if( $('.board_type01').length ){
		_SECRETMALL_.toggleOpen.wholeToggle('.board_type01 .b_item', '.b_header');
	}
	if( $('.reivew_type02').length ){
		_SECRETMALL_.toggleOpen.whole('.reivew_type02 .r_item .subBox .btnOpen', '.r_item', ['더보기', '닫기']);
	}
	if( $('.gradePopup_container').length ){
		_SECRETMALL_.tab.init('.gradePopup_container .content_wrap .tabBox', '.contBox', '.content_wrap');
	}
	if ($(".memberBox").length) {	// header 사용자 프로필 클릭 시
        _SECRETMALL_.toggleOpen.whole(".btn-member",".memberBox");
		_SECRETMALL_.autoClose('.memberBox');
	}
	if ($("#getAlarm1").length) {	// 공통 > 마케팅 동의
        _SECRETMALL_.getAlarm.loadFunction("#getAlarm1");
    }
	// _SECRETMALL_.autoClose('.calendar_container', 'visible');
	// _SECRETMALL_.autoClose('.userCount_container', 'visible');
	if ($(".btn_topGo").length) { // 상단으로 가기
		_SECRETMALL_.goToTheTop.init();
	}
	

	

	if( $('.chargeList_page').length ){				_SECRETMALL_.pages.chargeList.init();	}		// 요금리스트
	if ($('.mainTab_content .tab_inner').length) {	_SECRETMALL_.pages.chargeList.tabScrollEvt();}; // 요금리스트 메인 탭 스크롤이벤트
	if ($('.line-banner-container').length){		_SECRETMALL_.pages.chargeList.lineBannerScrollEvt();}; // 요금리스트 라인배너 스크롤이벤트
	if( $('.payment_page').length ){				_SECRETMALL_.pages.payment.init();	}			// 예약및결제

});






var _SECRETMALL_ = {}

_SECRETMALL_ = {
	/* s: layout */
	layout: {
		footer: {
			init: function(){
				$('.footer_container .btnMore').on('click', function(){
					$('.container').toggleClass('footerExpand');
				});
			},
		},
	},
	/* e: layout */
	/* select */
	selectBox : {
		default: {
			init: function(el){
				var _THIS = this;
				
				// 초기값 셋팅
				_THIS.update(el);

				// 셀렉트 선택
				$(document).on('change', el + ' select', function(){
					_THIS.movement( el, $(this) );
				});
			},
			movement: function(el, $this, initFlag){
				// console.log(el, $this, initFlag);
				var $value = $this.closest(el).find('.valTxt');
				if( initFlag && $value.find('.hint').length ){
					return false;
				}
				$value.text( $this.find('option:selected').text() );
			},
			update: function(el){
				var _THIS = this;
				$(el).find('select').each(function(idx){
					_THIS.movement( el, $(this), true );
				});
			},
		},
		list: {
			init: function(wrap){
				var _THIS = this;
				var $wrap = $(wrap)

				// 열고닫기
				$wrap.find('.valTxt').on('click', function(){
					var $this = $(this);
					if( $this.closest(wrap).hasClass('dis') ){
						return;
					}
					if( $this.parent().hasClass('active') ){
						$wrap.removeClass('active');
					} else {
						$wrap.removeClass('active');
						$this.parent().addClass('active');
					}
				});
				_SECRETMALL_.autoClose(wrap, 'active');

				// 데이터변경
				$wrap.find('li a').on('click', function(){
					_THIS.movement( wrap, $(this) );
					return false;
				});

				// 업데이트
				_THIS.update(wrap);
			},
			movement: function(wrap, $this, initFlag){
				var $wrap = $this.closest(wrap);
				$wrap.find('li').removeClass('on');
				$this.closest('li').addClass('on');
				$this.closest(wrap).find('.valTxt').text( $this.closest('li.on a').text() );
				$this.closest(wrap).removeClass('active');
			},
			update: function(wrap){
				var _THIS = this;
				$(wrap).each(function(idx){
					if( $(this).find('li.on').length && !$(this).find('.hint').length ){
						_THIS.movement( wrap, $(this).find('li.on a'), true );
					}
				});
			},
		},
	},
	/* 파일찾기 */
	findFile: {
		init: function(el, findFile){
			var _THIS = this;

			// 파일선택
			$(document).on('change', el + ' ' + findFile, function(){
				_THIS.movement(el, $(this));
			});

			// 파일삭제
			$(document).on('click', el + ' .bDel' , function(){
				$(this).closest(el).find(findFile).val('');
				_THIS.movement(el, $(this));
			});
		},
		movement: function(el, thisEl){
			thisEl.closest(el).find('.f_val input').val( thisEl.val() );
		},
	},
	/* 폼요소_포커스_컨트롤 */
	formFocus: function(el){

		// 마우스오버
		/*$(document).on('mouseover', el, function(){
			$(this).parent().addClass('hover');
		});
		$(document).on('mouseout', el, function(){
			$(this).parent().removeClass('hover');
		});*/

		// 포커스
		$(document).on('focus', el, function(){
			$(this).parent().addClass('focus');
		});
		$(document).on('focusout', el, function(){
			$(this).parent().removeClass('focus');
		});
	},
	/* 폼요소_입력어삭제 */
	formClear: function(el){
		$(document).on('click', el + ' .bDel', function(){
			$(this).parent().find('input, textarea').val('');
		});
	},
	/* 다른 곳 클릭하면 닫기 */
	autoClose: function(trg, _className) {
		var openClass = _className;
		if( !_className ){
			openClass = 'open';
		}
		$(document).click(function (e) {
			var $trg = $(trg);
			if (!$trg.is(e.target) && $trg.has(e.target).length === 0) {
				$trg.each(function () {
					var $this = $(this);
					if ($this.hasClass(openClass)) {
						$this.removeClass(openClass);
						/*if( $('.header_container').length ){
							_SECRETMALL_.layout.header.movement();
						}*/
					}
				})
			}
		});
	},
	tab: {
		init: function(_tab, _tabCont, _tabWrap, _initOpen, _callBack){
			var _THIS = this;

			_THIS.movement(_tab, _tabCont, _tabWrap, _initOpen);

			$(document).on('click', _tab + ' li a', function(){
				var idx = $(this).closest(_tab).find('li').index( $(this).closest('li') );
				_THIS.movement(_tab, _tabCont, _tabWrap, idx, _callBack);				
				return false;
			});
		},
		movement: function(_tab, _tabCont, _tabWrap, _initOpen, _callBack){
			var openIdx = _initOpen;
			if(!openIdx){
				openIdx = 0;
			}
			// console.log(initOpen);

			$(_tab).find('li').removeClass('on');
			$(_tab).find('li').eq(openIdx).addClass('on');

			$(_tab).closest(_tabWrap).find(_tabCont).hide();
			$(_tab).closest(_tabWrap).find(_tabCont).eq(openIdx).show();
			// console.log(_tab, _tabCont, _tabWrap, initOpen);

			if(_callBack){
				_callBack();
			}
		},
	},
	toggleOpen: {
		oneself: function(el){
			$(document).on('click', el, function(){
				$(this).toggleClass('open');
				return false;
			});
		},
		whole: function(el, wrap, aryText){
			$(document).on('click', el, function(){
				var $this = $(this);
				var isOpen = $this.closest(wrap).hasClass('open');
				// console.log(aryText);

				if( isOpen ){
					$this.closest(wrap).removeClass('open');
					if(aryText){
						$this.text(aryText[0]);
					}
				} else {
					$this.closest(wrap).addClass('open');
					if(aryText){
						$this.text(aryText[1]);
					}
				}
				return false;
			});
		},
		wholeToggle: function(wrap, btn){
			$(document).on('click', wrap + ' ' + btn, function(){
				var $this = $(this);
				var isOpen = $this.closest(wrap).hasClass('open');

				$(wrap).removeClass('open');
				if( !isOpen ){
					$this.closest(wrap).addClass('open');
				}
				console.log(3);
				return false;
			});
		},
	},
	/* 팝업 */
	popup: function(el){
		var $pop = $(el);
		var isOpen = $pop.hasClass('visible');

		if( isOpen ){ // 닫힘
			$pop.removeClass('visible');
			// $('html,body').css('overflow','visible');
			// setTimeout(function(){$('html').scrollTop(scrlTop)}, 10);
		} else { // 열림
			scrlTop = $('html').scrollTop();
			$pop.addClass('visible');
			// $('html,body').css('overflow','hidden');
		}
	},
	searchOpen: {
		init: function(el){
			var _THIS = this;

			$(document).on('focus', el + ' .txtEntry input', function(){
				_THIS.movement(this, el);
			});

			_SECRETMALL_.autoClose(el);
		},
		movement: function(_this, wrap){
			var $this = $(_this);
			$this.closest(wrap).addClass('open');
			$this.closest(wrap).removeClass('black');
		},
	},
	loading: {
		loadingTimer: undefined,
		init: function(){
			if( $('.loading_type01').hasClass('visible') ){
				this.stopLoading();
			} else {
				this.movement();
			}
		},
		movement: function(){
			$('.loading_type01').addClass('visible');

			var degree = 0;
			var timer = setInterval(function(){
				$('.loading_type01 p').css('transform','rotate('+ degree +'deg)');
				degree+=45;
				if(degree > 350){
					degree = 0;
				}
			}, 100);

			this.loadingTimer = timer;
		},
		stopLoading: function(){
			$('.loading_type01').removeClass('visible');
			clearInterval(this.loadingTimer);
		},
	},
	btnFloat: {
		init: function(){
			var _THIS = this;
			_THIS.movement();

			$(window).on('scroll', function(){
				_THIS.movement();
			});
			$(window).on('resize', function(){
				_THIS.movement();
			});
		},
		movement: function(){
			var scrollTop = $(window).scrollTop();
			var innerHeight = $(window).height();
			var scrollHeight = $(document).height();
			var footerHeight =  $('.footer_container').height();
			var $btnFloat = $('.page_type03 .floating_section .btnFloat_wrap');
			var space = 0;
			if($('body').width > 1200){
				space = 150 - 30; // body_container padding-bottom 과 position bottom
			}

			if (scrollTop + innerHeight + footerHeight + 150 - 30 >= scrollHeight) {
				// 풋터가 보이는 시점
				$btnFloat.addClass('fixed');
			} else {
				// 위에서 움직이고 있는 상태
				$btnFloat.removeClass('fixed');
			}
			if( scrollTop > $('.page_type03 .mainContent_section .detail_content .tab_type02').offset().top - $('.header_container').height() ){
				// 보이기
				$btnFloat.show();				
			} else {
				$btnFloat.hide();
			}
		},
	},
	getAlarm: {
		// tooltip 숨김
		hideTooltip: function() {
			$('.tooltip-type1').slideUp(100);
		},
		// input check 상태 변경 시 동작
		changeToggle: function(el) {
			const tooltipText = $('.tooltip-type1__text');
			const agree = $('.tooltip-type1__text.--agree');
			const disagree = $('.tooltip-type1__text.--disagree');
			let tooltipTimeout;

			$(el).on("change", function() {
				$(".tooltip-type1").show();

				if ($(this).is(":checked")) {
					$(tooltipText).hide();
					$(agree).show();
				} 
				else {
					$(tooltipText).hide();
					$(disagree).show();
				}
				clearTimeout(tooltipTimeout);
				tooltipTimeout = setTimeout(_SECRETMALL_.getAlarm.hideTooltip, 3000);
			});
		},
		//페이지 로드 시 input check 상태 확인
		loadFunction: function(el) {
			let tooltipTimeout;
			const activeTxt = $(".tooltip-type1__text.--active");
			if (!$(el).is(":checked")) {
                $(el).find(activeTxt).tooltipTimeout;
                tooltipTimeout = setTimeout(_SECRETMALL_.getAlarm.hideTooltip, 3000);
            }
			_SECRETMALL_.getAlarm.changeToggle(el);
		}
	},
	goToTheTop: {

		init: function() {
			$('.btn_topGo').on('click', function(e){
				e.preventDefault();
				$('html, body').animate({scrollTop : 0}, 600);
			});
		}

	},
}

_SECRETMALL_.fn = {
	layerPopup: function(wrap, elBtn){
		$(document).on('click', wrap + ' ' + elBtn, function(){
			var $thisWrap = $(this).closest(wrap);
			var isOpen = $thisWrap.hasClass('open');
			if(isOpen){
				$thisWrap.removeClass('open');
				// $thisWrap.find('.layerPopup_container').removeClass('visible');
			} else {
				$thisWrap.addClass('open');
				// $thisWrap.find('.layerPopup_container').addClass('visible');
			}
		});
		/*$(document).on('click', wrap + ' .layerPopup_container .lPop_close', function(){
			$(this).closest(wrap).removeClass('open');
			$(this).closest('.layerPopup_container').removeClass('visible');
		});*/

		_SECRETMALL_.autoClose(wrap);
	},
}


_SECRETMALL_.pages = {
    chargeList: {
        init: function () {
            this.filter();
        },
        filter: function () {
            // 모바일용 필터 토글기능
            var sFilter = ".chargeList_page .detail_content .filter_inner .filter_wrap";
            $(document).on("click", sFilter + " .header_in .title", function () {
                var $this = $(this);
                var $thisParent = $this.parent();
                var idx = $thisParent.find(".title").index($this);
                var isOpen = $this.hasClass("on");

                $thisParent.find(".title").removeClass("on");
                $(sFilter + " .inner").removeClass("on");
                if (!isOpen) {
                    $this.addClass("on");
                    $(sFilter + " .inner")
                        .eq(idx)
                        .addClass("on");
                }
            });

            // 모바일용 필터 sticky 기능
            var sFilterInner = ".chargeList_page .detail_content .filter_inner";
            $(window).on("scroll", function () {
                var nScrl = $("html").scrollTop();
                var filterPosY =
                    $(".chargeList_page .detail_content").offset().top -
                    $(".chargeList_page .mainTab_content").height();

                if (nScrl > filterPosY) {
                    $(sFilterInner).addClass("fixed");
                } else {
                    $(sFilterInner).removeClass("fixed");
                }
            });
        },
        // 요금리스트 탭메뉴 스크롤이벤트
        tabScrollEvt: function () {
            const mainTab = ".mainTab_content";
            const mainTabHeight = $(mainTab).height() + 10;
            let filterHeight = $(".chargeList_page .search_type01").height();

            setSliderCss();

            $(window).on("scroll resize", function () {
                updateTabClasses($(window).scrollTop());
                setSliderCss();
            });

            function updateTabClasses(scrollTop) {
                const tabSections = [
                    { id: "#mainContent", tab: 1 },
                    { id: "#divRateContainer", tab: 2 },
                    { id: "#hotelInfoSection", tab: 3 },
                ];

                for (const section of tabSections) {
                    let sectionOffset = $(section.id).offset().top - mainTabHeight - 1;

                    if ($(window).width() <= 980) {
                        filterHeight = $(".chargeList_page .search_type01").height();
                        sectionOffset -= filterHeight;
                    }

                    if (scrollTop >= sectionOffset) {
                        $(mainTab + " li").removeClass("on");
                        $(mainTab + " li:nth-child(" + section.tab + ")").addClass("on");
                    }
                }
            }

            $(mainTab + " li a").on("click", function (e) {
                e.preventDefault();

                const tabId = $(this).attr("href");
                let itemOffset = $(tabId).offset().top - mainTabHeight + 1;

                if ($(window).width() <= 980) {
                    filterHeight = $(".chargeList_page .search_type01").height();
                    itemOffset -= filterHeight;
                }

                $(mainTab + " li").removeClass("on");
                $(this).parent("li").addClass("on");

                $("html,body").animate({ scrollTop: itemOffset }, 600);
            });

            function setSliderCss() {
                let el = $(mainTab + " li.on a");
                let width = el.css("width");
                let left = el.offset().left - $(mainTab).offset().left;

                $(".tab-slider").css({ width: width, left: left });
            }
        },
        // 240527 요금리스트 라인배너 스크롤이벤트
        // lineBannerScrollEvt:function(){
			
		// 	const lineBanner = $(".line-banner-container");
			
		// 	if(lineBanner.hasClass('--active')){
				
		// 		const mainTabContent = $(".mainTab_content");
		// 		let mainTabHeight = mainTabContent.outerHeight();
		// 		let mainTabOffset = mainTabContent.offset().top;

		// 		if ($(window).width() <= 980) {
        //             mainTabHeight = mainTabContent.outerHeight();
        //             mainTabOffset = mainTabContent.offset().top;
        //         }

		// 		$(window).on("load scroll", function () {
		// 			lineBannerPosition();
		// 		});


		// 		$(window).on("load resize", function () {

		// 		});

		// 		function lineBannerPosition (){

		// 			let windowScrollTop = $(window).scrollTop();
        //             // let mainTabHeight = mainTabContent.outerHeight();
		// 			// let mainTabOffset = mainTabContent.offset().top;
					
		// 			if ( windowScrollTop >= mainTabOffset) {

		// 				if ($(window).width() <= 980) {
		// 					console.log(mainTabOffset);

		// 					const searchHeight = $(".filter_inner .search_type01").height();

		// 					$(lineBanner).stop().css("top", (mainTabHeight + searchHeight - 10));
		// 				}
		// 				else {
		// 					$(lineBanner).stop().css("top", mainTabHeight + 10);
		// 				}

		// 			}
		// 			if(windowScrollTop < mainTabOffset) {
		// 					console.log(mainTabOffset);
						
		// 				$(lineBanner).stop().css('top', '110px');
		// 			}
		// 		};
		// 	}
		// }
		lineBannerScrollEvt: function() {
			const lineBanner = $(".line-banner-container");
			
			if (lineBanner.hasClass('--active')) {
				const mainTabContent = $(".mainTab_content");
				let mainTabHeight, mainTabOffset;

				function updateMainTabPosition() {
					mainTabHeight = mainTabContent.outerHeight();
					mainTabOffset = mainTabContent.offset().top;
				}

				$(window).on("load resize", function () {
                    updateMainTabPosition();
                    lineBannerPosition();
                });

				$(window).on("load scroll", function() {
					lineBannerPosition();
				});

				function lineBannerPosition() {
					let windowScrollTop = $(window).scrollTop();
					
					if (windowScrollTop >= mainTabOffset) {
						if ($(window).width() <= 980) {
							const searchHeight = $(".filter_inner .search_type01").height();
							$(lineBanner).stop().css("top", (mainTabHeight + searchHeight - 10));
						} else {
							$(lineBanner).stop().css("top", mainTabHeight + 10);
						}
					} else {
						$(lineBanner).stop().css('top', '110px');
					}
				}
			}
		}


        // lineBannerScrollEvt: function() {
        // 	const lineBanner = $(".line-banner-container");
        // 	const mainTabContent = $(".mainTab_content");
        // 	let mainTabHeight = mainTabContent.outerHeight();
        // 	let searchHeight = $(".filter_inner .search_type01").height();

        // 	let mainTapMobilePositon = mainTabHeight + searchHeight - 10;
        // 	let mainTapPCpositon = mainTabHeight - 10;
        // 	let mainTabOffset;

        // 	if ($(window).width() <= 980) {
        // 		mainTabOffset = $(".mainTab_content").offset().top;
        // 	} else {
        // 		mainTabOffset = $(".mainTab_content").offset().top;
        // 	}

        // 	console.log(mainTapMobilePositon);

        // 	if (lineBanner.hasClass('--active')) {
        // 		$(window).on("load scroll resize", function() {
        // 		lineBannerPosition();
        // 		});

        // 		function lineBannerPosition() {
        // 		let windowScrollTop = $(window).scrollTop();
        // 		if (windowScrollTop >= mainTabOffset) {
        // 			if ($(window).width() <= 980) {
        // 			$(lineBanner).css("top", mainTapMobilePositon);
        // 			} else {
        // 			$(lineBanner).css("top", mainTapPCpositon + 10);
        // 			}
        // 		}
        // 		if (windowScrollTop < mainTabOffset) {
        // 			$(lineBanner).stop().css('top', '110px');
        // 		}
        // 		};
        // 	}

        // 	$(window).on("resize", function() {
        // 		if ($(window).width() <= 980) {
        // 		mainTabOffset = $(".mainTab_content").offset().top;
        // 		} else {
        // 		mainTabOffset = $(".mainTab_content").offset().top;
        // 		}
        // 		lineBannerPosition();
        // 	});
        // 	}
    },
    payment: {
        init: function () {
            this.hotelInfoMore();
            // this.asideLoc();
        },
        hotelInfoMore: function () {
            $(document).on(
                "click",
                ".payment_page .main_content .content_section.hotelInfo .btn_more",
                function () {
                    var $this = $(this);
                    var isOpen = $this.closest(".content_section").hasClass("open");

                    if (isOpen) {
                        $this.closest(".content_section").removeClass("open");
                        $this.find("span").text("전체보기");
                    } else {
                        $this.closest(".content_section").addClass("open");
                        $this.find("span").text("접기");
                    }
                    return false;
                }
            );
        },
        asideLoc: function () {
            $(window).on("scroll", function () {
                var nScrl = $("html").scrollTop();
                var $el = $(".payment_page .aside_content");

                if (nScrl > $(".header_container").height()) {
                    $el.css({ top: nScrl - 50 });
                    // $el.stop().animate({'top': nScrl-50}, 500 );
                } else {
                    $el.css({ top: 10 });
                    // $el.stop().animate({'top': 10}, 500 );
                }
            });
        },
    },
};















/******************************
***
***	plugin option
***
******************************/
var _swiperOption = {
    mainRoomViewer: function ($el) {
        return {
            loop: true,
            speed: 400,
            spaceBetween: 0,
            effect: "fade",
            navigation: {
                nextEl: $el + " .swiper-button-next",
                prevEl: $el + " .swiper-button-prev",
            },
            pagination: {
                el: $el + " .swiper-pagination",
                type: "custom",
                renderCustom: function (swiper, current, total) {
                    return (
                        '<span class="current">' +
                        current +
                        '</span>/<span class="total">' +
                        total +
                        "</span>"
                    );
                },
            },
        };
    },
    bestViewer: function ($el) {
        return {
            // loop: true,
            slidesPerView: "auto",
            speed: 400,
            spaceBetween: 12,
            navigation: {
                nextEl: $el + " ~ .swiper-button-next",
                prevEl: $el + " ~ .swiper-button-prev",
            },
        };
    },
    common: function ($el) {
        return {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            // slidesPerView: 'auto',
            speed: 400,
            // spaceBetween: 12,
            navigation: {
                nextEl: $el + " .swiper-button-next",
                prevEl: $el + " .swiper-button-prev",
            },
            pagination: {
                el: $el + " .swiper-pagination",
            },
        };
    },
    // 시크릿몰 메인 추가
    mainBanner: function ($el) {
        return {
            autoplay: {
                delay: 3000,
            },
            loop: true,
            slidesPerView: "auto",
            speed: 400,
            pagination: {
                el: $el + " ~ .swiper-pagination",
                type: "bullets",
            },
            breakpoints: {
                1101: {
                    navigation: {
                        nextEl: $el + " ~ .swiper-button-next",
                        prevEl: $el + " ~ .swiper-button-prev",
                    },
                },
            },
        };
    },
    bestViewer: function ($el) {
        return {
            // loop: true,
            slidesPerView: "auto",
            speed: 400,
            spaceBetween: 12,
            navigation: {
                nextEl: $el + " ~ .swiper-button-next",
                prevEl: $el + " ~ .swiper-button-prev",
            },
        };
    },
    itemList05: function ($el) {
        return {
            // loop: true,
            slidesPerView: "auto",
            speed: 400,
            spaceBetween: 10,
            navigation: {
                nextEl: $el + " ~ .swiper-button-next",
                prevEl: $el + " ~ .swiper-button-prev",
            },
            breakpoints: {
                1101: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                },
            },
        };
    },
    itemList06: function ($el) {
        return {
            // loop: true,
            slidesPerView: "auto",
            speed: 400,
            spaceBetween: 10,
            navigation: {
                nextEl: $el + " ~ .swiper-button-next",
                prevEl: $el + " ~ .swiper-button-prev",
            },
            breakpoints: {
                1101: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                },
            },
        };
    },
};


/*var _masonryOption = {
	item03: function(){
		return {
			itemSelector: '.i_item',
			gutter: 20,
			transitionDuration:0,
		}
	}
}
*/


// ----------------------
//	Popup Evt Component
// ----------------------

function popClose(popup, customClass = "--active") {
    let $popup = $(popup);
    $popup.fadeOut(100, function () {
        $popup.removeClass(customClass);
    });
}

function popOpen(popup, callback, customClass = "--active") {
    let $popup = $(popup);
    $popup.fadeIn(100, function () {
        $popup.addClass(customClass);
        if (callback) callback();
    });

    $popup.find(".btn-close").on("click", function () {
        popClose($popup);
    });
}

function popAutoClose(popup, customClass = "--active") {
    let $popup = $(popup);
    $(document).on("click", function (e) {
        if (!$(e.target).closest($popup).length && !$(e.target).is($popup)) {
            if ($popup.hasClass(customClass)) {
                popClose($popup);
            }
        }
    });
}

// ----------------------
//	Slide Toggle Evt Component
// ----------------------

function slideEvt(activeBtn, wrapper, targetItem, customClass = "--active") {
    const $wrapper = $(activeBtn).closest(wrapper);
    console.log($wrapper);
        $(activeBtn).closest(wrapper).toggleClass(customClass);

    if ($wrapper.hasClass(customClass)) {
        $wrapper.find(targetItem).slideDown();
    } else {
        $wrapper.find(targetItem).slideUp();
    }
}
