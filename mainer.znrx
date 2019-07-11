    var constants = {
        panelRowTake: 20,
        panelRowSpan: '2.44%',
        animationTime: 130,
        animationMaxDelay: 2,
        sliderHeight: '8vw'
    };
    $('divm[type=dimmableLights]').children('holder').each(function (index, holder) {
        $($(holder).parent()[0]).css({
            'grid-template-rows': 'repeat(' + (((index + 1) * constants.panelRowTake) + index) + ', ' + constants.panelRowSpan + ')'
        });
        dimmableLightManager(holder);
    });
    $('divm[type=staticLights]').children('holder').each(function (index, holder) {
        $($(holder).parent()[0]).css({
            'grid-template-rows': 'repeat(' + (((index + 1) * constants.panelRowTake) + index) + ', ' + constants.panelRowSpan + ')'
        });
        staticLightManager(holder);
    });
    $('divm[type=Fans]').children('holder').each(function (index, holder) {
        $($(holder).parent()[0]).css({
            'grid-template-rows': 'repeat(' + (((index + 1) * constants.panelRowTake) + index) + ', ' + constants.panelRowSpan + ')'
        });
        fanManager(holder);
    });

    function fanManager(holder) {
        var symbol,
            name,
            slider,
            knob,
            knobExcess,
            rate,
            sliderExcess,
            fullSlider,
            leftgap,
            topgap,
            range,
            xc,
            yc,
            r;
        fullSlider();
        adjuster();
        $(window).resize(function () {
            adjuster();
        });
        $(holder).mousedown(toggler);
        stateCoordinator();
        function fullSlider() {
            $($(holder).children('slider[type=emptySlider]')[0].outerHTML).insertAfter($(holder).children('slider[type=emptySlider]')[0]);
            $($($(holder).children('slider[type=emptySlider]')[0]).next('slider')[0]).attr('type', 'fullSlider');
            $($(holder).children('slider[type=fullSlider]')[0]).css({
                'border': 'solid 0.2vw  #25a5fe',
                'clip': 'rect(0vw, 0vw, " + constants.sliderHeight + ", 0vw)',
                'z-index': '2',
                'border-bottom': 'hidden',
                'border-bottom': 'none'
            });
        }
        function stateCoordinator() {
            setter(parseFloat($(holder).attr('value')), true);
            if ($(holder).attr('state') == 'on') {
                $(fullSlider).css('opacity', '1');
                $(rate).css('opacity', '1');
                $(slider).css('opacity', '1');
                $(knob).css('opacity', '1');
                $(holder).css({
                    "background-image": "linear-gradient(rgba(34, 111, 175, 0.7), rgba(57, 120, 181, 0.7))"
                });
                dragManager();
            } else if ($(holder).attr('state') == 'off') {
                $(knob).unbind('touchstart');
                $(knob).unbind('mousedown');
                $(fullSlider).css('opacity', '0.5');
                $(rate).css('opacity', '0.5');
                $(slider).css('opacity', '0.5');
                $(knob).css('opacity', '0');
                $(holder).css({
                    "background-image": "linear-gradient(rgba(52, 64, 122, 0.3), rgba(53, 63, 121, 0.3))"
                });
            }
        }
        function adjuster() {
            symbol = $(holder).children('img[type=symbol]')[0];
            name = $(holder).children('p[type=identity]')[0];
            knob = $(holder).children('img[type=knob]')[0];
            knobExcess = knob.getBoundingClientRect().width / 2;
            rate = $(holder).children('p[type=rate]')[0];
            slider = $(holder).children('slider[type=emptySlider]')[0];
            sliderExcess = parseInt($(slider).css("border-left-width").replace(/[^-\d\.]/g, ''));
            fullSlider = $(holder).children('slider[type=fullSlider]')[0];
            leftgap = slider.getBoundingClientRect().left - holder.getBoundingClientRect().left;
            topgap = slider.getBoundingClientRect().top - holder.getBoundingClientRect().top;
            range = slider.getBoundingClientRect().width - sliderExcess;
            xc = leftgap + (range / 2) + (sliderExcess / 2);
            yc = topgap + (range / 2) + (sliderExcess / 2);
            r = (range / 2);
            setter(parseFloat($(holder).attr('value')), true);
        }
        function topCalc(x) {
            return (-1 * Math.pow((-1 * Math.pow(((x + (sliderExcess / 2) + leftgap) - xc), 2)) + (Math.pow(r, 2)), 0.5)) + yc;
        }
        function setter(horizontalOffset, percent) {
            if (percent) {
                horizontalOffset *= (range / 100);
            }
            var y = topCalc(horizontalOffset);
            if (!isNaN(y)) {
                knob.style.left = leftgap + sliderExcess + horizontalOffset - knobExcess;
                knob.style.top = y - knobExcess + "px";
                horizontalOffset *= (100 / range);
                rate.innerHTML = Math.trunc(horizontalOffset) + "%";
                $(fullSlider).css({
                    "clip": "rect(0vw, " + ((horizontalOffset / 100) * (range + sliderExcess)) + "px, " + constants.sliderHeight + ", 0vw)"
                });
                $(holder).attr('value', horizontalOffset);
            } else { return false; }
        }
        function toggler(e) {
            if (e.target == knob) {
                return;
            }
            if ($(holder).attr('state') == 'switching') {
                return;
            }
            if ($(holder).attr('state') == 'off') {
                $(holder).attr('state', 'switching');
                $(holder).css({
                    "background-image": "linear-gradient(rgba(34, 111, 175, 0.7), rgba(57, 120, 181, 0.7))"
                });
                $(knob).animate({ opacity: 1 }, constants.animationTime, function () {
                    dragManager();
                });
                $(fullSlider).animate({ opacity: 1 }, constants.animationTime);
                $(rate).animate({ opacity: 1 }, constants.animationTime);
                $(slider).animate({ opacity: 1 }, constants.animationTime + constants.animationMaxDelay, function () {
                    $(holder).attr('state', 'on');
                });
            } else if ($(holder).attr('state') == 'on') {
                $(holder).attr('state', 'switching');
                $(holder).css({
                    "background-image": "linear-gradient(rgba(52, 64, 122, 0.3), rgba(53, 63, 121, 0.3))"
                });
                $(knob).unbind('touchstart');
                $(knob).unbind('mousedown');
                $(knob).animate({ opacity: 0 }, constants.animationTime);
                $(fullSlider).animate({ opacity: 0.5 }, constants.animationTime);
                $(rate).animate({ opacity: 0.5 }, constants.animationTime);
                $(slider).animate({ opacity: 0.5 }, constants.animationTime + constants.animationMaxDelay, function () {
                    $(holder).attr('state', 'off');
                });
            }
        }
        function dragManager() {
            var xMargin;
            $(knob).unbind('touchstart');
            $(knob).unbind('mousedown');
            $(knob).on('touchstart', function (e) {
                Gripped(e, true);
            });
            $(knob).mousedown(function (e) {
                Gripped(e, false);
            });
            function Gripped(e, touch) {
                e = e || window.event;
                e.preventDefault();
                var x;
                if (touch) {
                    x = e.touches[0].clientX;
                }
                else {
                    x = e.clientX;
                }
                xMargin = x - (knob.getBoundingClientRect().left + knobExcess);
                endDrag();
                $(document).mouseup(function () {
                    endDrag();
                });
                $(document).on('touchend', function () {
                    endDrag();
                });
                $(document).mousemove(function (e) {
                    Drag(e, false);
                });
                $(document).on('touchmove', function (e) {
                    Drag(e, true);
                });
            }
            function Drag(e, touch) {
                e = e || window.event;
                var x;
                if (touch) {
                    x = e.touches[0].clientX;
                }
                else {
                    e.preventDefault();
                    x = e.clientX;
                }
                var setRate = ((x - (slider.getBoundingClientRect().left + (sliderExcess / 2)) - xMargin) / range) * 100;
                if ((setRate >= 0) && (setRate <= 100)) {
                    setter((x - (slider.getBoundingClientRect().left + (sliderExcess / 2)) - xMargin), false); //setter(setRate, true);
                }
                else {
                    if (setRate < 0) {
                        setter(0, true);
                    }
                    else if (setRate > 100) {
                        setter(100, true);
                    }
                }
            }
            function endDrag() {
                $(document).unbind('mouseup');
                $(document).unbind('mousemove');
                $(document).unbind('touchend');
                $(document).unbind('touchmove');
            }
        }
    }
    function staticLightManager(holder) {
        var symbol,
            name,
            litLight;
        litLight();
        adjuster();
        $(holder).mousedown(toggler);
        stateCoordinator();
        function litLight() {
            $($(holder).children('img[type=symbol]')[0].outerHTML).insertAfter($(holder).children('img[type=symbol]')[0]);
            $($($(holder).children('img[type=symbol]')[0]).next('img')[0]).attr({
                'type': 'litLight',
                'src': '/Assets/Images/LitLight.png'
            });
            $($(holder).children('img[type=litLight]')[0]).css({
                'opacity': '0'
            });
        }
        function adjuster() {
            symbol = $(holder).children('img[type=symbol]')[0];
            name = $(holder).children('p[type=identity]')[0];
            litLight = $(holder).children('img[type=litLight]')[0];
        }
        function stateCoordinator() {
            if ($(holder).attr('state') == 'on') {
                $(litLight).css('opacity', '1');
                $(holder).css({
                    "background-image": "linear-gradient(rgba(34, 111, 175, 0.7), rgba(57, 120, 181, 0.7))"
                });
            } else if ($(holder).attr('state') == 'off') {
                $(litLight).css('opacity', '0');
                $(holder).css({
                    "background-image": "linear-gradient(rgba(52, 64, 122, 0.3), rgba(53, 63, 121, 0.3))"
                });
            }
        }
        function toggler() {
            if ($(holder).attr('state') == "switching") {
                return;
            }
            if ($(holder).attr('state') == "off") {
                $(holder).attr('state', 'switching');
                $(litLight).animate({ opacity: 1 }, constants.animationTime + constants.animationMaxDelay, function () {
                    $(holder).attr('state', 'on');
                });
                $(holder).css({
                    "background-image": "linear-gradient(rgba(34, 111, 175, 0.7), rgba(57, 120, 181, 0.7))"
                });
            } else if ($(holder).attr('state') == "on") {
                $(holder).attr('state', 'switching');
                $(litLight).animate({ opacity: 0 }, constants.animationTime + constants.animationMaxDelay, function () {
                    $(holder).attr('state', 'off');
                });
                $(holder).css({
                    "background-image": "linear-gradient(rgba(52, 64, 122, 0.3), rgba(53, 63, 121, 0.3))"
                });
            }
        }
    }
    function dimmableLightManager(holder) {
        var symbol,
            name,
            litLight,
            slider,
            knob,
            knobExcess,
            rate,
            sliderExcess,
            fullSlider,
            leftgap,
            topgap,
            range,
            xc,
            yc,
            r;
        litLight();
        fullSlider();
        adjuster();
        $(window).resize(function () {
            adjuster();
        });
        $(holder).mousedown(toggler);
        stateCoordinator();
        function litLight() {
            $($(holder).children('img[type=symbol]')[0].outerHTML).insertAfter($(holder).children('img[type=symbol]')[0]);
            $($($(holder).children('img[type=symbol]')[0]).next('img')[0]).attr({
                'type': 'litLight',
                'src': '/Assets/Images/LitLight.png'
            });
            $($(holder).children('img[type=litLight]')[0]).css({
                'opacity': '0'
            });
        }
        function fullSlider() {
            $($(holder).children('slider[type=emptySlider]')[0].outerHTML).insertAfter($(holder).children('slider[type=emptySlider]')[0]);
            $($($(holder).children('slider[type=emptySlider]')[0]).next('slider')[0]).attr('type', 'fullSlider');
            $($(holder).children('slider[type=fullSlider]')[0]).css({
                'border': 'solid 0.2vw  #25a5fe',
                'clip': 'rect(0vw, 0vw, " + constants.sliderHeight + ", 0vw)',
                'z-index': '2',
                'border-bottom': 'hidden',
                'border-bottom': 'none'
            });
        }
        function stateCoordinator() {
            setter(parseFloat($(holder).attr('value')), true);
            if ($(holder).attr('state') == 'on') {
                $(fullSlider).css('opacity', '1');
                $(rate).css('opacity', '1');
                $(slider).css('opacity', '1');
                $(knob).css('opacity', '1');
                $(holder).css({
                    "background-image": "linear-gradient(rgba(34, 111, 175, 0.7), rgba(57, 120, 181, 0.7))"
                });
                dragManager();
            } else if ($(holder).attr('state') == 'off') {
                $(knob).unbind('touchstart');
                $(knob).unbind('mousedown');
                $(fullSlider).css('opacity', '0.5');
                $(rate).css('opacity', '0.5');
                $(slider).css('opacity', '0.5');
                $(knob).css('opacity', '0');
                $(litLight).css('opacity', '0');
                $(holder).css({
                    "background-image": "linear-gradient(rgba(52, 64, 122, 0.3), rgba(53, 63, 121, 0.3))"
                });
            }
        }
        function adjuster() {
            symbol = $(holder).children('img[type=symbol]')[0];
            name = $(holder).children('p[type=identity]')[0];
            litLight = $(holder).children('img[type=litLight]')[0];
            knob = $(holder).children('img[type=knob]')[0];
            knobExcess = knob.getBoundingClientRect().width / 2;
            rate = $(holder).children('p[type=rate]')[0];
            slider = $(holder).children('slider[type=emptySlider]')[0];
            sliderExcess = parseInt($(slider).css("border-left-width").replace(/[^-\d\.]/g, ''));
            fullSlider = $(holder).children('slider[type=fullSlider]')[0];
            leftgap = slider.getBoundingClientRect().left - holder.getBoundingClientRect().left;
            topgap = slider.getBoundingClientRect().top - holder.getBoundingClientRect().top;
            range = slider.getBoundingClientRect().width - sliderExcess;
            xc = leftgap + (range / 2) + (sliderExcess / 2);
            yc = topgap + (range / 2) + (sliderExcess / 2);
            r = (range / 2);
            setter(parseFloat($(holder).attr('value')), true);
        }
        function topCalc(x) {
            return (-1 * Math.pow((-1 * Math.pow(((x + (sliderExcess / 2) + leftgap) - xc), 2)) + (Math.pow(r, 2)), 0.5)) + yc;
        }
        function setter(horizontalOffset, percent) {
            if (percent) {
                horizontalOffset *= (range / 100);
            }
            var y = topCalc(horizontalOffset);
            if (!isNaN(y)) {
                knob.style.left = leftgap + sliderExcess + horizontalOffset - knobExcess;
                knob.style.top = y - knobExcess + "px";
                horizontalOffset *= (100 / range);
                rate.innerHTML = Math.trunc(horizontalOffset) + "%";
                $(fullSlider).css({
                    "clip": "rect(0vw, " + ((horizontalOffset / 100) * (range + sliderExcess)) + "px, " + constants.sliderHeight + ", 0vw)"
                });
                $(litLight).css('opacity', horizontalOffset / 100);
                $(holder).attr('value', horizontalOffset);
            } else { return false; }
        }
        function toggler(e) {
            if (e.target == knob) {
                return;
            }
            if ($(holder).attr('state') == 'switching') {
                return;
            }
            if ($(holder).attr('state') == 'off') {
                $(holder).attr('state', 'switching');
                $(holder).css({
                    "background-image": "linear-gradient(rgba(34, 111, 175, 0.7), rgba(57, 120, 181, 0.7))"
                });
                $(knob).animate({ opacity: 1 }, constants.animationTime, function () {
                    dragManager();
                });
                $(fullSlider).animate({ opacity: 1 }, constants.animationTime);
                $(rate).animate({ opacity: 1 }, constants.animationTime);
                $(litLight).animate({ opacity: parseFloat($(holder).attr('value')) / 100 }, constants.animationTime);
                $(slider).animate({ opacity: 1 }, constants.animationTime + constants.animationMaxDelay, function () {
                    $(holder).attr('state', 'on');
                });
            } else if ($(holder).attr('state') == 'on') {
                $(holder).attr('state', 'switching');
                $(holder).css({
                    "background-image": "linear-gradient(rgba(52, 64, 122, 0.3), rgba(53, 63, 121, 0.3))"
                });
                $(knob).unbind('touchstart');
                $(knob).unbind('mousedown');
                $(knob).animate({ opacity: 0 }, constants.animationTime);
                $(fullSlider).animate({ opacity: 0.5 }, constants.animationTime);
                $(rate).animate({ opacity: 0.5 }, constants.animationTime);
                $(litLight).animate({ opacity: 0 }, constants.animationTime);
                $(slider).animate({ opacity: 0.5 }, constants.animationTime + constants.animationMaxDelay, function () {
                    $(holder).attr('state', 'off');
                });
            }
        }
        function dragManager() {
            var xMargin;
            $(knob).unbind('touchstart');
            $(knob).unbind('mousedown');
            $(knob).on('touchstart', function (e) {
                Gripped(e, true);
            });
            $(knob).mousedown(function (e) {
                Gripped(e, false);
            });
            function Gripped(e, touch) {
                e = e || window.event;
                e.preventDefault();
                var x;
                if (touch) {
                    x = e.touches[0].clientX;
                }
                else {
                    x = e.clientX;
                }
                xMargin = x - (knob.getBoundingClientRect().left + knobExcess);
                endDrag();
                $(document).mouseup(function () {
                    endDrag();
                });
                $(document).on('touchend', function () {
                    endDrag();
                });
                $(document).mousemove(function (e) {
                    Drag(e, false);
                });
                $(document).on('touchmove', function (e) {
                    Drag(e, true);
                });
            }
            function Drag(e, touch) {
                e = e || window.event;
                var x;
                if (touch) {
                    x = e.touches[0].clientX;
                }
                else {
                    e.preventDefault();
                    x = e.clientX;
                }
                var setRate = ((x - (slider.getBoundingClientRect().left + (sliderExcess / 2)) - xMargin) / range) * 100;
                if ((setRate >= 0) && (setRate <= 100)) {
                    setter((x - (slider.getBoundingClientRect().left + (sliderExcess / 2)) - xMargin), false); //setter(setRate, true);
                }
                else {
                    if (setRate < 0) {
                        setter(0, true);
                    }
                    else if (setRate > 100) {
                        setter(100, true);
                    }
                }
            }
            function endDrag() {
                $(document).unbind('mouseup');
                $(document).unbind('mousemove');
                $(document).unbind('touchend');
                $(document).unbind('touchmove');
            }
        }
    }
