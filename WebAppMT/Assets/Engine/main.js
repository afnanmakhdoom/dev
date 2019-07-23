$('divl').each(function (index, panel) {
    $(panel).css({
        'height': (Array.from($(panel).children()).length * (constants.panelHeightInterval * 2)) + '%',
        'grid-template-rows': 'repeat(' + (Array.from($(panel).children()).length * constants.panelRowTake) + ', ' + constants.panelRowSpan + ')'
    });
});
$('divm').each(function (index, panel) {
    $(panel).css({
        'height': (Array.from($(panel).children()).length * constants.panelHeightInterval) + '%',
        'grid-template-rows': 'repeat(' + (Array.from($(panel).children()).length * constants.panelRowTake) + ', ' + constants.panelRowSpan + ')'
    });
});

$(document).ready(function () {
    $('divm[type=dimmableLights]').children('holder').each(function (index, holder) {
        dimmableLightManager(holder);
    });
    $('divm[type=staticLights]').children('holder').each(function (index, holder) {
        staticLightManager(holder);
    });
    $('divm[type=Fans]').children('holder').each(function (index, holder) {
        fanManager(holder);
    });
    $('divl[type=airConditioner]').children('holder').each(function (index, holder) {
        airConditionerManager(holder);
    });
        var a = document.getElementsByClassName("weatherwidget-io"),
            i = [];
        if (0 !== a.length) {
            for (var t = function (t) {
                var e = a[t],
                    o = {};
                o.id = "weatherwidget-io-" + t, o.href = e.href, o.label_1 = e.getAttribute("data-label_1"), o.label_2 = e.getAttribute("data-label_2"), o.font = e.getAttribute("data-font"), o.icons = e.getAttribute("data-icons"), o.mode = e.getAttribute("data-mode"), o.days = e.getAttribute("data-days"), o.theme = e.getAttribute("data-theme"), o.basecolor = e.getAttribute("data-basecolor"), o.accent = e.getAttribute("data-accent"), o.textcolor = e.getAttribute("data-textcolor"), o.textAccent = e.getAttribute("data-textAccent"), o.highcolor = e.getAttribute("data-highcolor"), o.lowcolor = e.getAttribute("data-lowcolor"), o.suncolor = e.getAttribute("data-suncolor"), o.mooncolor = e.getAttribute("data-mooncolor"), o.cloudcolor = e.getAttribute("data-cloudcolor"), o.cloudfill = e.getAttribute("data-cloudfill"), o.raincolor = e.getAttribute("data-raincolor"), o.snowcolor = e.getAttribute("data-snowcolor"), o.windcolor = e.getAttribute("data-windcolor"), o.fogcolor = e.getAttribute("data-fogcolor"), o.thundercolor = e.getAttribute("data-thundercolor"), o.hailcolor = e.getAttribute("data-hailcolor"), o.dayscolor = e.getAttribute("data-dayscolor"), o.tempcolor = e.getAttribute("data-tempcolor"), o.desccolor = e.getAttribute("data-desccolor"), o.label1color = e.getAttribute("data-label1color"), o.label2color = e.getAttribute("data-label2color"), o.shadow = e.getAttribute("data-shadow"), o.scale = e.getAttribute("data-scale"), (r = document.getElementById(o.id)) && e.removeChild(r), i[o.id] = document.createElement("iframe"), i[o.id].setAttribute("id", o.id), i[o.id].setAttribute("class", "weatherwidget-io-frame"), i[o.id].setAttribute("scrolling", "no"), i[o.id].setAttribute("frameBorder", "0"), i[o.id].setAttribute("width", "100%"), i[o.id].setAttribute("src", "https://weatherwidget.io/w/"), i[o.id].style.display = "block", i[o.id].style.position = "absolute", i[o.id].style.top = "0", i[o.id].onload = function () {
                    i[o.id].contentWindow.postMessage(o, "https://weatherwidget.io");
                }, e.style.display = "block", e.style.position = "relative", e.style.height = "150px", e.style.padding = "0", e.style.overflow = "hidden", e.style.textAlign = "left", e.style.textIndent = "-299rem", e.appendChild(i[o.id])
            }, e = 0, o = Math.min(a.length, 10); e < o; e++) {
                var r;
                t(e);
            }
            window.addEventListener("message", function (t) {
                "https://weatherwidget.io" === t.origin && i[t.data.wwId] && i[t.data.wwId].parentNode && (i[t.data.wwId].style.height = t.data.wwHeight + "px", i[t.data.wwId].parentNode.style.height = t.data.wwHeight + "px")
                $(a).css({
                    'display': 'inline-block',
                    'height': '10%',
                    'position': 'absolute',
                    'pointer- events': 'none'
                });
            });
        } else setTimeout(__weatherwidget_init, 1500);
});

function airConditionerManager(holder) {
    var power,
        powerExt,
        dialer,
        dialerInactive,
        slider,
        sliderExcess,
        fullSlider,
        knob,
        knobExcess,
        rate,
        leftGap,
        topGap,
        fullTopGap,
        range,
        xc,
        yc,
        r,
        tempPerDev,
        tempStart,
        marginDev,
        coolMode,
        warmMode,
        windMode,
        fan,
        fanRate,
        swingDirection,
        swingStyle;
    fullSlider();
    adjuster();
    $(window).resize(function () {
        adjuster();
    });
    $(power).mousedown(toggler);
    $(powerExt).mousedown(toggler);
    stateCoordinator();
    function fullSlider() {
        $('<img type="fullSlider" style="z-index:3; width:66%; position: absolute; top: 37%; left: 50%; transform: translate(-50%,-37%);" src="Assets/Images/RoundSlider.png" />').insertAfter($(holder).children('img[type=slider]')[0]);
        $(holder).append('<p type="rate" style="font-size: 6vw; top: 44%; left: 52.5%; transform: translate(-52.5%,-44%); z-index:3;"></p>');
        $('<img type="knob" style="width: 10%; position: absolute; z-index: 4;" src="Assets/Images/Knob.png" />').insertAfter($(holder).children('img[type=fullSlider]')[0]);
    }
    function stateCoordinator() {
        setter(null, null, null, parseFloat($(holder).attr('value')));
        if ($(holder).attr('state') == 'on') {
            $(rate).css('opacity', '1');
            $(knob).css('opacity', '1');
            $(dialer).css('opacity', '1');
            $(coolMode).css('opacity', '1');
            $(warmMode).css('opacity', '1');
            $(windMode).css('opacity', '1');
            $(fan).css('opacity', '1');
            $(fanRate).css('opacity', '1');
            $(swingDirection).css('opacity', '1');
            $(swingStyle).css('opacity', '1');
            $(fullSlider).css('opacity', '1');
            $(dialer).css('opacity', '1');
            $(dialerInactive).css('opacity', '0');
            $(powerExt).css('opacity', '1');
            dragManager();
        } else if ($(holder).attr('state') == 'off') {
            $(knob).unbind('touchstart');
            $(knob).unbind('mousedown');
            $(rate).css('opacity', '0.5');
            $(knob).css('opacity', '0');
            $(dialer).css('opacity', '0');
            $(coolMode).css('opacity', '0.5');
            $(warmMode).css('opacity', '0.5');
            $(windMode).css('opacity', '0.5');
            $(fan).css('opacity', '0.5');
            $(fanRate).css('opacity', '0.5');
            $(swingDirection).css('opacity', '0.5');
            $(swingStyle).css('opacity', '0.5');
            $(slider).css({
                "-webkit-mask-image": "",
                "mask-image": ""
            });
            $(fullSlider).css('opacity', '0');
            $(dialer).css('opacity', '0');
            $(dialerInactive).css('opacity', '1');
            $(powerExt).css('opacity', '0');
        }
    }
    function adjuster() {
        power = $(holder).children('img[type=power]')[0];
        powerExt = $(holder).children('img[type=powerExt]')[0];
        dialer = $(holder).children('img[type=dialer]')[0];
        dialerInactive = $(holder).children('img[type=dialerInactive]')[0];
        slider = $(holder).children('img[type=slider]')[0];
        sliderExcess = slider.getBoundingClientRect().width * 0.07;
        fullSlider = $(holder).children('img[type=fullSlider]')[0];
        knob = $(holder).children('img[type=knob]')[0];
        knobExcess = knob.getBoundingClientRect().width / 2;
        rate = $(holder).children('p[type=rate]')[0];
        leftGap = slider.getBoundingClientRect().left - holder.getBoundingClientRect().left;
        topGap = slider.getBoundingClientRect().top - holder.getBoundingClientRect().top;
        range = slider.getBoundingClientRect().width - sliderExcess;
        xc = leftGap + (range / 2) + (sliderExcess / 2);
        yc = topGap + (range / 2) + (sliderExcess / 2);
        r = (range / 2);
        tempPerDev = ((constants.maxTemp - constants.minTemp) + 1) / ((constants.maxDev + (Math.PI * 2.5)) - (constants.minDev + (Math.PI * 0.5)));
        tempStart = constants.minTemp - 0.5 - Math.abs((constants.minDev + (Math.PI * 0.5)) * tempPerDev);
        marginDev = (1 / $(window).width()) * constants.marginDevMultiplier;
        coolMode = $(holder).children('img[type=coolMode]')[0];
        warmMode = $(holder).children('img[type=warmMode]')[0];
        windMode = $(holder).children('img[type=windMode]')[0];
        fan = $(holder).children('img[type=fan]')[0];
        fanRate = $(holder).children('p[type=fanRate]')[0];
        swingDirection = $(holder).children('img[type=swingDirection]')[0];
        swingStyle = $(holder).children('img[type=swingStyle]')[0];
        if (aspectRatio() >= 2.5) {
            $(swingDirection).css({
                "top": "82%", "left": "94%", "transform": "translate(-94%,-85%)"
            });
        } else {
            $(swingDirection).css({
                "top": "94%", "left": "83%", "transform": "translate(-83%,-97%)"
            });
        }
        setter(null, null, null, parseFloat($(holder).attr('value')));
    }
    function posCalc(x, y, dev) {
        if (!dev) {
            x = xc - (x + (sliderExcess / 2) + leftGap);
            y = yc - (y + (sliderExcess / 2) + topGap);
            dev = Math.atan2(y, x);
            x = xc - (r * Math.cos(dev));
            y = yc - (r * Math.sin(dev));
        } else {
            x = xc - (r * Math.cos(dev));
            y = yc - (r * Math.sin(dev));
        }
        return { 'x': x, 'y': y, 'deviation': dev };
    }
    function setter(x, y, dev, temp) {
        if (temp) {
            dev = ((temp - tempStart) * (1 / tempPerDev)) - (Math.PI / 2);
        }
        var position = posCalc(x, y, dev);
        knob.style.left = position.x - knobExcess + "px";
        knob.style.top = position.y - knobExcess + "px";
        if (position.deviation >= (-0.5 * Math.PI)) {
            position.deviation += (0.5 * Math.PI);
        }
        else {
            position.deviation += (2.5 * Math.PI);
        }
        rate.innerHTML = Math.round((tempPerDev * position.deviation) + tempStart) + constants.degrees;
        if ($(holder).attr('state') == 'on') {
            $(slider).css({
                "-webkit-mask-image": "conic-gradient(from " + (position.deviation * (180 / Math.PI) + 180) + "deg, #fff " + (360 - position.deviation * (180 / Math.PI)) + "deg, transparent 0deg)",
                "mask-image": "conic-gradient(from " + (position.deviation * (180 / Math.PI) + 180) + "deg, #fff " + (360 - position.deviation * (180 / Math.PI)) + "deg, transparent 0deg)"
            });
        }
        $(fullSlider).css({
            "-webkit-mask-image": "conic-gradient(from 180deg, #fff " + position.deviation * (180 / Math.PI) + "deg, transparent 0deg)",
            "mask-image": "conic-gradient(from 180deg, #fff " + position.deviation * (180 / Math.PI) + "deg, transparent 0deg)"
        });
        $(holder).attr('value', (tempPerDev * position.deviation) + tempStart);
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
            $(knob).animate({ opacity: 1 }, constants.animationTime, function () {
                dragManager();
            });
            $(rate).animate({ opacity: 1 }, constants.animationTime);
            $(coolMode).animate({ opacity: 1 }, constants.animationTime);
            $(warmMode).animate({ opacity: 1 }, constants.animationTime);
            $(windMode).animate({ opacity: 1 }, constants.animationTime);
            $(fan).animate({ opacity: 1 }, constants.animationTime);
            $(fanRate).animate({ opacity: 1 }, constants.animationTime);
            $(swingDirection).animate({ opacity: 1 }, constants.animationTime);
            $(swingStyle).animate({ opacity: 1 }, constants.animationTime);
            $(powerExt).animate({ opacity: 1 }, constants.animationTime);
            $(fullSlider).animate({ opacity: 1 }, constants.animationTime);
            $(dialerInactive).animate({ opacity: 0 }, constants.animationTime);
            $(dialer).animate({ opacity: 1 }, constants.animationTime + constants.animationMaxDelay, function () {
                $(holder).attr('state', 'on');
            });
        } else if ($(holder).attr('state') == 'on') {
            $(holder).attr('state', 'switching');
            $(knob).unbind('touchstart');
            $(knob).unbind('mousedown');
            $(knob).animate({ opacity: 0 }, constants.animationTime);
            $(rate).animate({ opacity: 0.5 }, constants.animationTime);
            $(coolMode).animate({ opacity: 0.5 }, constants.animationTime);
            $(warmMode).animate({ opacity: 0.5 }, constants.animationTime);
            $(windMode).animate({ opacity: 0.5 }, constants.animationTime);
            $(fan).animate({ opacity: 0.5 }, constants.animationTime);
            $(fanRate).animate({ opacity: 0.5 }, constants.animationTime);
            $(swingDirection).animate({ opacity: 0.5 }, constants.animationTime);
            $(swingStyle).animate({ opacity: 0.5 }, constants.animationTime);
            $(powerExt).animate({ opacity: 0 }, constants.animationTime);
            $(slider).css({
                "-webkit-mask-image": "",
                "mask-image": ""
            });
            $(fullSlider).animate({ opacity: 0 }, constants.animationTime);
            $(dialerInactive).animate({ opacity: 1 }, constants.animationTime);
            $(dialer).animate({ opacity: 0 }, constants.animationTime + constants.animationMaxDelay, function () {
                $(holder).attr('state', 'off');
            });
        }
    }
    function dragManager() {
        var xMargin, yMargin;
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
                yOld = e.touches[0].clientY;
            }
            else {
                x = e.clientX;
                yOld = e.clientY;
            }
            xMargin = x - (knob.getBoundingClientRect().left + knobExcess);
            yMargin = yOld - (knob.getBoundingClientRect().top + knobExcess);
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
            var x, y;
            if (touch) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            }
            else {
                e.preventDefault();
                x = e.clientX;
                y = e.clientY;
            }
            var currentDev = posCalc(knob.getBoundingClientRect().left - (holder.getBoundingClientRect().left + leftGap + (sliderExcess / 2)) + knobExcess,
                knob.getBoundingClientRect().top - (holder.getBoundingClientRect().top + topGap + (sliderExcess / 2)) + knobExcess).deviation;
            var dragDev = posCalc(x - (slider.getBoundingClientRect().left + (sliderExcess / 2)) - xMargin,
                y - (slider.getBoundingClientRect().top + (sliderExcess / 2)) - yMargin).deviation;
            if (
                (!(((currentDev <= 0) && (currentDev >= -Math.PI * 0.5)) &&
                    ((dragDev >= Math.PI * 0.5) && (dragDev <= Math.PI))))
                &&
                (!(((currentDev >= -Math.PI) && (currentDev <= -Math.PI * 0.5)) &&
                    ((dragDev >= 0) && (dragDev <= Math.PI * 0.5))))
                //&&
                //(!((dragDev < constants.minDev) && (dragDev > constants.maxDev)))
            ) {
                if (!(((currentDev >= constants.minDev) && (currentDev < Math.PI * 0.5)) &&
                    ((dragDev < constants.minDev) && (dragDev < Math.PI * 0.5)))) {
                    if (!((currentDev <= constants.maxDev) &&
                        ((dragDev > constants.maxDev) && (dragDev < Math.PI * 0.5)))) {
                        setter(x - (slider.getBoundingClientRect().left + (sliderExcess / 2)) - xMargin,
                            y - (slider.getBoundingClientRect().top + (sliderExcess / 2)) - yMargin);
                    } else {
                        setter(null, null, constants.maxDev - marginDev);
                    }
                } else {
                    setter(null, null, constants.minDev + marginDev);
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
function fanManager(holder) {
    var symbol,
        name,
        slider,
        knob,
        knobExcess,
        rate,
        sliderExcess,
        fullSlider,
        leftGap,
        topGap,
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
        $(holder).append('<p type="rate" style="top: 12%;left: 90%; transform: translate(-50%,-80%);"></p>');
        $($(holder).children('slider[type=emptySlider]')[0].outerHTML).insertAfter($(holder).children('slider[type=emptySlider]')[0]);
        $($($(holder).children('slider[type=emptySlider]')[0]).next('slider')[0]).attr('type', 'fullSlider');
        $('<img type="knob" style="width: 9%; position: absolute; z-index: 3;" src="Assets/Images/Knob.png" />').insertAfter($(holder).children('slider[type=fullSlider]')[0]);
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
        sliderExcess = parseFloat($(slider).css("border-left-width").replace(/[^-\d\.]/g, ''));
        fullSlider = $(holder).children('slider[type=fullSlider]')[0];
        leftGap = slider.getBoundingClientRect().left - holder.getBoundingClientRect().left;
        topGap = slider.getBoundingClientRect().top - holder.getBoundingClientRect().top;
        range = slider.getBoundingClientRect().width - sliderExcess;
        xc = leftGap + (range / 2) + (sliderExcess / 2);
        yc = topGap + (range / 2) + (sliderExcess / 2);
        r = (range / 2);
        setter(parseFloat($(holder).attr('value')), true);
    }
    function topCalc(x) {
        return (-1 * Math.pow((-1 * Math.pow(((x + (sliderExcess / 2) + leftGap) - xc), 2)) + Math.pow(r, 2), 0.5)) + yc;
    }
    function setter(horizontalOffset, percent) {
        if (percent) {
            horizontalOffset *= (range / 100);
        }
        var y = topCalc(horizontalOffset);
        if (!isNaN(y)) {
            knob.style.left = (leftGap + (sliderExcess / 2) + horizontalOffset - knobExcess) + "px";
            knob.style.top = (y - knobExcess) + "px";
            horizontalOffset *= (100 / range);
            rate.innerHTML = Math.round(horizontalOffset) + "%";
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
            'src': 'Assets/Images/LitLight.png'
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
        leftGap,
        topGap,
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
            'src': 'Assets/Images/LitLight.png'
        });
        $($(holder).children('img[type=litLight]')[0]).css({
            'opacity': '0'
        });
    }
    function fullSlider() {
        $(holder).append('<p type="rate" style="top: 12%;left: 90%; transform: translate(-50%,-80%);"></p>');
        $($(holder).children('slider[type=emptySlider]')[0].outerHTML).insertAfter($(holder).children('slider[type=emptySlider]')[0]);
        $($($(holder).children('slider[type=emptySlider]')[0]).next('slider')[0]).attr('type', 'fullSlider');
        $('<img type="knob" style="width: 9%; position: absolute; z-index: 3;" src="Assets/Images/Knob.png" />').insertAfter($(holder).children('slider[type=fullSlider]')[0]);
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
        sliderExcess = parseFloat($(slider).css("border-left-width").replace(/[^-\d\.]/g, ''));
        fullSlider = $(holder).children('slider[type=fullSlider]')[0];
        leftGap = slider.getBoundingClientRect().left - holder.getBoundingClientRect().left;
        topGap = slider.getBoundingClientRect().top - holder.getBoundingClientRect().top;
        range = slider.getBoundingClientRect().width - sliderExcess;
        xc = leftGap + (range / 2) + (sliderExcess / 2);
        yc = topGap + (range / 2) + (sliderExcess / 2);
        r = (range / 2);
        setter(parseFloat($(holder).attr('value')), true);
    }
    function topCalc(x) {
        return (-1 * Math.pow((-1 * Math.pow(((x + (sliderExcess / 2) + leftGap) - xc), 2)) + Math.pow(r, 2), 0.5)) + yc;
    }
    function setter(horizontalOffset, percent) {
        if (percent) {
            horizontalOffset *= (range / 100);
        }
        var y = topCalc(horizontalOffset);
        if (!isNaN(y)) {
            knob.style.left = (leftGap + (sliderExcess / 2) + horizontalOffset - knobExcess) + "px";
            knob.style.top = (y - knobExcess) + "px";
            horizontalOffset *= (100 / range);
            rate.innerHTML = Math.round(horizontalOffset) + "%";
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
//alert(aspectRatio());
function aspectRatio() {
    function width() {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
        );
    }
    function height() {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.documentElement.clientHeight
        );
    }
    return (width() / height());
}
