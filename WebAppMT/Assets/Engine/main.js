var server = io.connect(constants.serverIP), room, roomCommands, appliances = {
    'airConditioners': [],
    'switches': [],
    'mainSwitch': null
};
server.on('connect', function () {
    server.emit('postconfig');
});
server.on('message', function (stack) {
    if (stack) {
        if (room == null) {
            room = stack;
            initialize();
        }
    }
});
server.on('sendcommand', function (stack) {
    if (stack.Rooms[0].Devices['Air Conditioner'].length > 0) {
        for (i = 0; i < stack.Rooms[0].Devices['Air Conditioner'].length; i++) {
            room.Rooms[0].Devices['Air Conditioner'][room.Rooms[0].Devices['Air Conditioner'].findIndex(function (appliance) {
                if (appliance['Air Conditioner No.'] == stack.Rooms[0].Devices['Air Conditioner'][i]['Air Conditioner No.']) {
                    return appliance;
                }
            })] = stack.Rooms[0].Devices['Air Conditioner'][i];
            appliances.airConditioners[appliances.airConditioners.findIndex(function (appliance) {
                if (appliance['identity'] == stack.Rooms[0].Devices['Air Conditioner'][i]['Air Conditioner No.']) {
                    return appliance;
                }
            })].invoker(stack.Rooms[0].Devices['Air Conditioner'][i]);
            if (stack.Rooms[0].Devices['Air Conditioner'][i]['Power'] == 'ON') {
                appliances.mainSwitch();
            }
        }
    }
    if (stack.Rooms[0].Devices['Switches'].length > 0) {
        for (i = 0; i < stack.Rooms[0].Devices['Switches'].length; i++) {
            room.Rooms[0].Devices['Switches'][room.Rooms[0].Devices['Switches'].findIndex(function (appliance) {
                if (appliance['Switch No.'] == stack.Rooms[0].Devices['Switches'][i]['Switch No.']) {
                    return appliance;
                }
            })] = stack.Rooms[0].Devices['Switches'][i];
            appliances.switches[appliances.switches.findIndex(function (appliance) {
                if (appliance['identity'] == stack.Rooms[0].Devices['Switches'][i]['Switch No.']) {
                    return appliance;
                }
            })].invoker(stack.Rooms[0].Devices['Switches'][i]);
            if (stack.Rooms[0].Devices['Switches'][i]['Status'] == 1) {
                appliances.mainSwitch();
            }
        }
    }//room.Rooms[0].Devices['Switches'][room.Rooms[0].Devices['Switches'].filter(appliance => { return appliance['Switch No.'] == stack.Rooms[0].Devices['Switches'][0]['Switch No.'] })[0]] = stack.Rooms[0].Devices['Switches'][0];
});
function initialize() {
    var roomInfo = room.Rooms[0];
    document.getElementById("roomIdentity").innerHTML = roomInfo['Room Name'];
    $(roomInfo.Devices['Air Conditioner']).each(function (index, appliance) {
        $($($('wrappermin')[0]).children('divl[type=airConditioners]')[0]).append('<holder state = "' + appliance['Power'].toLowerCase() + '" value = "' + appliance['Temperature'] + '"  switch = "' + appliance['Air Conditioner No.'] + '" '
            + 'minTemp = "' + appliance['Min Range'] + '" maxTemp = "' + appliance['Max Range'] + '" fanRate = "' + appliance['Fan Speed'] + '" Mode = "' + appliance['Mode'] + '">'
            + '<img type="power" style="z-index:2; width:8.5%; height: 10%; position: absolute; top: 8%; left: 90%; transform: translate(-90%,-8%);" src="Assets/Images/Power.png" />'
            + '<img type="powerExt" style="z-index:1; width:0.57%; height: 4.7%; position: absolute; top: 6.7%; left: 86.716%; transform: translate(-86.716%,-6.7%);" src="Assets/Images/PowerExt.png" />'
            + '<img type="dialer" style="border-radius: 50%; z-index:1; width:75%; position: absolute; top: 37%; left: 50%; transform: translate(-50%,-37%);" src="Assets/Images/DialerActive.png" />'
            + '<img type="dialerInactive" style="border-radius: 50%; z-index:1; opacity:0; width:75%; position: absolute; top: 37%; left: 50%; transform: translate(-50%,-37%);" src="Assets/Images/DialerRing.png" />'
            + '<img type="slider" style="border-radius: 50%; filter: grayscale(100%); z-index:2; width:71%; position: absolute; top: 37%; left: 50%; transform: translate(-50%,-37%);" src="Assets/Images/RoundSlider.png" />'

            + '<div type="modes" style="z-index: 4; width: 35%; height: 12%; position: absolute; top: 66%; left: 50%; text-align:center; transform: translate(-50%, -66%);">'
            + '<img type="cool" style="width:23%; margin-left:6%; margin-right: 6%; margin-bottom:1%; margin-top:1%; height: 90%;" type = "coolMode" src = "Assets/Images/CoolMode.png" >'
            + '<img type="heat" style="width:13%; margin-left:6%; margin-right: 6%; margin-bottom:1%; margin-top:1%; height: 100%;" type="heatMode" src="Assets/Images/HeatMode.png">'
            + '<img type="dry" style="width:15%; margin-left:6%; margin-right: 6%; margin-bottom:6%; margin-top: 6%; height: 60%;" type="dryMode" src="Assets/Images/DryMode.png">'
            + '</div>'

            + '<div type="fan" style="z-index: 4; width: 10%; height: 13%; position: absolute; top: 91%; left: 5.5%; text-align:center; transform: translate(-5.5%, -91%);">'
            + '<img type="symbol" style="width:100%; height: 80%; margin-bottom:10%;" src="Assets/Images/FanAC.png" />'
            + '<p type="fanRate" style="text-align: center; font-size:1.8vw;"></p>'
            + '</div>'

            + '<img type="swingLR" style="z-index:1; width:8.5%; height: 9%; position: absolute; top: 94%; left: 83%; transform: translate(-83%,-94%); margin:0%; padding:0%;" src="Assets/Images/SwingLR.png" />'
            + '<img type="swingUD" style="z-index:1; width:10%; height:7%; position: absolute; top: 92%; left: 97%; transform: translate(-97%,-92%); margin:0%; padding:0%;" src="Assets/Images/SwingUD.png" />'
            + '</holder>');
    });
    $(roomInfo.Devices['Switches']).each(function (index, appliance) {
        if (appliance['Switch type'].toLowerCase() == "dimmable light") {
            $($($('wrappermax')[0]).children('divm[type=dimmableLights]')[0]).append('<holder state="' + (appliance['Status'] == 0 ? 'off' : 'on') + '" value="' + appliance['Dim Value'] + '" switch = "' + appliance['Switch No.'] + '">'
                + '<slider type="emptySlider" style = "top: 25%; left: 50%; transform: translate(-50%,-25%);" ></slider >'
                + '<img type="symbol" style="width:13%; height:22.5%; position: absolute; top: 45%; left: 50%; transform: translate(-50%,-45%);" src="Assets/Images/StaticLight.png" />'
                + '<p type="identity" style="top: 80%;left: 50%; transform: translate(-50%,-80%);">' + appliance['Switch type'] + '</p>'
                + '</holder>');
        } else if (appliance['Switch type'].toLowerCase() == "static light") {
            $($($('wrappermax')[0]).children('divm[type=staticLights]')[0]).append('<holder state="' + (appliance['Status'] == 0 ? 'off' : 'on') + '" switch = "' + appliance['Switch No.'] + '">'
                + '<img type = "symbol" style = "width:13%; height:22.5%; position: absolute; top: 45%; left: 50%; transform: translate(-50%,-45%);" src = "Assets/Images/StaticLight.png" />'
                + '<p type="identity" style="top: 80%;left: 50%; transform: translate(-50%,-80%);">' + appliance['Switch type'] + '</p>'
                + '</holder>');
        } else if (appliance['Switch type'].toLowerCase() == "fan") {
            $($($('wrappermax')[0]).children('divm[type=fans]')[0]).append('<holder state="' + (appliance['Status'] == 0 ? 'off' : 'on') + '" value="' + appliance['Dim Value'] + '" switch = "' + appliance['Switch No.'] + '">'
                + '<slider type = "emptySlider" style = "top: 25%; left: 50%; transform: translate(-50%,-25%);" ></slider>'
                + '<img type="symbol" style="width:15%; height:20%; position: absolute; top: 47%; left: 50%; transform: translate(-50%,-47%);" src="Assets/Images/Fan.png" />'
                + '<p type="identity" style="top: 80%;left: 50%; transform: translate(-50%,-80%);">' + appliance['Switch type'] + '</p>'
                + '</holder >');
        }
    });
    roomCommands = JSON.parse(JSON.stringify(room));
    roomCommands.Rooms[0].Devices['Air Conditioner'] = [];
    roomCommands.Rooms[0].Devices['Switches'] = [];
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
        $(window).on('load', function () {
            $('divm[type=dimmableLights]').children('holder').each(function (index, holder) {
                appliances.switches.push({ 'identity': parseInt($(holder).attr('switch')), 'invoker': dimmableLightManager(holder) });
            });
            $('divm[type=staticLights]').children('holder').each(function (index, holder) {
                appliances.switches.push({ 'identity': parseInt($(holder).attr('switch')), 'invoker': staticLightManager(holder) });
            });
            $('divm[type=fans]').children('holder').each(function (index, holder) {
                appliances.switches.push({ 'identity': parseInt($(holder).attr('switch')), 'invoker': fanManager(holder) });
            });
            $('divl[type=airConditioners]').children('holder').each(function (index, holder) {
                appliances.airConditioners.push({ 'identity': parseInt($(holder).attr('switch')), 'invoker': airConditionerManager(holder) });
            });
            appliances.mainSwitch = mainSwitchManager($('#mainSwitch'));
        });
    });
}
function applianceUpdater(appliance, custom, isJSON) {
    var updateCommand;
    if (!isJSON) {
        updateCommand = JSON.parse(JSON.stringify(roomCommands));
        if ($($(appliance).parent()[0]).attr('type') == 'airConditioners') {
            updateCommand.Rooms[0].Devices['Air Conditioner'].push(JSON.parse(JSON.stringify(room.Rooms[0].Devices['Air Conditioner'].filter(airConditioner => { return airConditioner['Air Conditioner No.'] == parseInt($(appliance).attr('switch')) })[0])));
            updateCommand.Rooms[0].Devices['Air Conditioner'][0]['Temperature'] = Math.round($(appliance).attr('value'));
            updateCommand.Rooms[0].Devices['Air Conditioner'][0]['Command'] = 'Temp' + Math.round($(appliance).attr('value'));
            updateCommand.Rooms[0].Devices['Air Conditioner'][0]['Power'] = $(appliance).attr('state').toUpperCase();
            updateCommand.Rooms[0].Devices['Air Conditioner'][0]['Mode'] = $(appliance).attr('mode');
            updateCommand.Rooms[0].Devices['Air Conditioner'][0]['Fan Speed'] = $(appliance).attr('fanRate');
            updateCommand.Rooms[0].Devices['Air Conditioner'][0]['Min Range'] = constants.minTemp;
            updateCommand.Rooms[0].Devices['Air Conditioner'][0]['Max Range'] = constants.maxTemp;
            switch (custom) {
                case 'power':
                    updateCommand.Rooms[0].Devices['Air Conditioner'][0]['Command'] = $(appliance).attr('state').toUpperCase();
                    break;
                case 'mode':
                    updateCommand.Rooms[0].Devices['Air Conditioner'][0]['Command'] = $(appliance).attr('Mode');
                    break;
                case 'fan':
                    updateCommand.Rooms[0].Devices['Air Conditioner'][0]['Command'] = 'Wind';
                    break;
                case 'swingLR':
                    server.emit('SwingLR');
                    return;
                case 'swingUD':
                    server.emit('SwingUD');
                    return;
            }
        }
        else if ($($(appliance).parent()[0]).attr('type') == 'dimmableLights') {
            updateCommand.Rooms[0].Devices['Switches'].push(JSON.parse(JSON.stringify(room.Rooms[0].Devices['Switches'].filter(dimmableLight => { return dimmableLight['Switch No.'] == parseInt($(appliance).attr('switch')); })[0])));
            updateCommand.Rooms[0].Devices['Switches'][0]['Dim Value'] = Math.round($(appliance).attr('value'));
            updateCommand.Rooms[0].Devices['Switches'][0]['Status'] = ($(appliance).attr('state').toLowerCase() == "on" ? 1 : 0);
        }
        else if ($($(appliance).parent()[0]).attr('type') == 'fans') {
            updateCommand.Rooms[0].Devices['Switches'].push(JSON.parse(JSON.stringify(room.Rooms[0].Devices['Switches'].filter(fan => { return fan['Switch No.'] == parseInt($(appliance).attr('switch')); })[0])));
            updateCommand.Rooms[0].Devices['Switches'][0]['Dim Value'] = Math.round($(appliance).attr('value'));
            updateCommand.Rooms[0].Devices['Switches'][0]['Status'] = ($(appliance).attr('state').toLowerCase() == "on" ? 1 : 0);
        }
        else if ($($(appliance).parent()[0]).attr('type') == 'staticLights') {
            updateCommand.Rooms[0].Devices['Switches'].push(JSON.parse(JSON.stringify(room.Rooms[0].Devices['Switches'].filter(fan => { return fan['Switch No.'] == parseInt($(appliance).attr('switch')); })[0])));
            updateCommand.Rooms[0].Devices['Switches'][0]['Status'] = ($(appliance).attr('state').toLowerCase() == "on" ? 1 : 0);
        }
    } else {
        updateCommand = JSON.parse(JSON.stringify(appliance));
    }
    server.emit('recvcommand', JSON.stringify(updateCommand));
}
function mainSwitchManager(mainSwitch) {
    var deactivatedDevices = JSON.parse(JSON.stringify(roomCommands));
    $(mainSwitch).on('change', toggleAppliances);
    return dismisser;
    function toggleAppliances() {
        var updateCommand = JSON.parse(JSON.stringify(roomCommands));
        if (!mainSwitch.prop('checked')) {
            $(room.Rooms[0].Devices['Air Conditioner']).each(function (index, appliance) {
                if (appliance['Power'] == 'ON') {
                    deactivatedDevices.Rooms[0].Devices['Air Conditioner'].push(JSON.parse(JSON.stringify(appliance)));
                    var offAppliance = JSON.parse(JSON.stringify(appliance));
                    offAppliance['Power'] = 'OFF';
                    offAppliance['Command'] = 'OFF';
                    updateCommand.Rooms[0].Devices['Air Conditioner'].push(JSON.parse(JSON.stringify(offAppliance)));
                }
            });
            $(room.Rooms[0].Devices['Switches']).each(function (index, appliance) {
                if (appliance['Status'] == 1) {
                    deactivatedDevices.Rooms[0].Devices['Switches'].push(JSON.parse(JSON.stringify(appliance)));
                    var offAppliance = JSON.parse(JSON.stringify(appliance));
                    offAppliance['Status'] = 0;
                    updateCommand.Rooms[0].Devices['Switches'].push(JSON.parse(JSON.stringify(offAppliance)));
                }
            });
            applianceUpdater(updateCommand, 'power', true);
        } else {
            $(deactivatedDevices.Rooms[0].Devices['Air Conditioner']).each(function (index, appliance) {
                deactivatedDevices.Rooms[0].Devices['Air Conditioner'].push(JSON.parse(JSON.stringify(appliance)));
                var offAppliance = JSON.parse(JSON.stringify(appliance));
                offAppliance['Power'] = 'ON';
                offAppliance['Command'] = 'ON';
                updateCommand.Rooms[0].Devices['Air Conditioner'].push(JSON.parse(JSON.stringify(offAppliance)));
            });
            $(deactivatedDevices.Rooms[0].Devices['Switches']).each(function (index, appliance) {
                deactivatedDevices.Rooms[0].Devices['Switches'].push(JSON.parse(JSON.stringify(appliance)));
                var offAppliance = JSON.parse(JSON.stringify(appliance));
                offAppliance['Status'] = 1;
                updateCommand.Rooms[0].Devices['Switches'].push(JSON.parse(JSON.stringify(offAppliance)));
            });
            applianceUpdater(updateCommand, 'power', true);
            deactivatedDevices = JSON.parse(JSON.stringify(roomCommands));
        }
    }
    function dismisser() {
        deactivatedDevices = JSON.parse(JSON.stringify(roomCommands));
        $(mainSwitch).off('change');
        $(mainSwitch).prop("checked", true);
        $(mainSwitch).on('change', toggleAppliances);
    }
}
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
        modes,
        fan,
        swingLR,
        swingUD;
    sliderFill();
    adjuster();
    $(window).resize(function () {
        adjuster();
    });
    $(power).mousedown(toggler);
    $(powerExt).mousedown(toggler);
    stateCoordinator();
    return invoker;
    function invoker(updates) {
        setter(null, null, null, updates['Temperature'], true);
        modeSetter(updates['Mode']);
        fanSpeedSetter(updates['Fan Speed']);
        switcher(updates['Power'] == "ON" ? true : false);
    }
    function sliderFill() {
        $($(holder).children('img[type=slider]')[0].outerHTML).insertAfter($(holder).children('img[type=slider]')[0]);
        $($(holder).children('img[type=slider]')[1]).attr('type', 'fullSlider');
        $($(holder).children('img[type=fullSlider]')[0]).css('filter', '');
        $(holder).append('<p type="rate" style="font-size: 6vw; top: 44%; left: 52.5%; transform: translate(-52.5%,-44%); z-index:3;"></p>');
        $('<img type="knob" style="width: 10%; position: absolute; z-index: 4;" src="Assets/Images/Knob.png" />').insertAfter($(holder).children('img[type=fullSlider]')[0]);
    }
    function stateCoordinator() {
        setter(null, null, null, parseFloat($(holder).attr('value')));
        modeSetter($(holder).attr('Mode'));
        fanSpeedSetter($(holder).attr('fanRate'));
        if ($(holder).attr('state') == 'on') {
            $(rate).css('opacity', '1');
            $(knob).css('opacity', '1');
            $(dialer).css('opacity', '1');
            $(modes).css('opacity', '1');
            $(fan).css('opacity', '1');
            $(swingLR).css('opacity', '1');
            $(swingUD).css('opacity', '1');
            $(fullSlider).css('opacity', '1');
            $(dialer).css('opacity', '1');
            $(dialerInactive).css('opacity', '0');
            $(powerExt).css('opacity', '1');
            $(modes).on('click', modeChanger);
            $(fan).on('click', fanSpeedChanger);
            $(swingLR).on('click', swingX);
            $(swingUD).on('click', swingY);
            dragManager();
        } else if ($(holder).attr('state') == 'off') {
            $(knob).unbind('touchstart');
            $(knob).unbind('mousedown');
            $(rate).css('opacity', '0.5');
            $(knob).css('opacity', '0');
            $(dialer).css('opacity', '0');
            $(modes).css('opacity', '0.5');
            $(fan).css('opacity', '0.5');
            $(swingLR).css('opacity', '0.5');
            $(swingUD).css('opacity', '0.5');
            $(slider).css({
                "-webkit-mask-image": "",
                "mask-image": ""
            });
            $(fullSlider).css('opacity', '0');
            $(dialer).css('opacity', '0');
            $(dialerInactive).css('opacity', '1');
            $(powerExt).css('opacity', '0');
            $(modes).off('click');
            $(fan).off('click');
            $(swingLR).off('click');
            $(swingUD).off('click');
        }
    }
    function modeChanger() {
        if ($(holder).attr('Mode') == "Cool") {
            $(holder).attr('Mode', 'Heat');
        } else if ($(holder).attr('Mode') == "Heat") {
            $(holder).attr('Mode', 'Dry');
        } else if ($(holder).attr('Mode') == "Dry") {
            $(holder).attr('Mode', 'Cool');
        } else {
            $(holder).attr('Mode', 'Cool');
        }
        applianceUpdater(holder, 'mode');
    }
    function fanSpeedChanger() {
        applianceUpdater(holder, 'fan');
    }
    function modeSetter(mode) {
        $(modes).children('img').each(function (index, modeDisplay) {
            $(modeDisplay).removeClass();
        });
        $(modes).children('img[type=' + mode.toLowerCase() + ']').addClass(mode);
        $(holder).attr('Mode', mode);
    }
    function fanSpeedSetter(rate) {
        $(fan).children('p[type=fanRate]')[0].innerHTML = rate;
        $(holder).attr('fanRate', rate);
    }
    function swingX() {
        applianceUpdater(holder, 'swingLR');
    }
    function swingY() {
        applianceUpdater(holder, 'swingUD');
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
        tempPerDev = ((parseFloat($(holder).attr('maxTemp')) - parseFloat($(holder).attr('minTemp'))) + 1) / ((constants.maxDev + (Math.PI * 2.5)) - (constants.minDev + (Math.PI * 0.5)));
        tempStart = parseFloat($(holder).attr('minTemp')) - 0.5 - Math.abs((constants.minDev + (Math.PI * 0.5)) * tempPerDev);
        marginDev = (1 / $(window).width()) * constants.marginDevMultiplier;
        modes = $(holder).children('div[type=modes]')[0];
        fan = $(holder).children('div[type=fan]')[0];
        swingLR = $(holder).children('img[type=swingLR]')[0];
        swingUD = $(holder).children('img[type=swingUD]')[0];
        if (aspectRatio() >= 2.5) {
            $(swingLR).css({
                "top": "82%", "left": "94%", "transform": "translate(-94%,-85%)"
            });
        } else {
            $(swingLR).css({
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
    function setter(x, y, dev, temp, external) {
        if (temp) {
            if ((temp == Math.round($(holder).attr('value'))) && (external)) {
                return;
            }
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
            $(holder).attr('state', 'on');
        } else if ($(holder).attr('state') == 'on') {
            $(holder).attr('state', 'off');
        }
        applianceUpdater(holder, 'power');
    }
    function switcher(state) {
        $(holder).attr('state', 'switching');
        if (state) {
            $(knob).animate({ opacity: 1 }, constants.animationTime, function () {
                dragManager();
            });
            $(rate).animate({ opacity: 1 }, constants.animationTime);
            $(modes).animate({ opacity: 1 }, constants.animationTime);
            $(fan).animate({ opacity: 1 }, constants.animationTime);
            $(swingLR).animate({ opacity: 1 }, constants.animationTime);
            $(swingUD).animate({ opacity: 1 }, constants.animationTime);
            $(powerExt).animate({ opacity: 1 }, constants.animationTime);
            $(fullSlider).animate({ opacity: 1 }, constants.animationTime);
            $(dialerInactive).animate({ opacity: 0 }, constants.animationTime);
            $(modes).off('click');
            $(fan).off('click');
            $(swingLR).off('click');
            $(swingUD).off('click');
            $(modes).on('click', modeChanger);
            $(fan).on('click', fanSpeedChanger);
            $(swingLR).on('click', swingX);
            $(swingUD).on('click', swingY);
            $(dialer).animate({ opacity: 1 }, constants.animationTime + constants.animationMaxDelay, function () {
                $(holder).attr('state', 'on');
            });
        } else {
            $(knob).unbind('touchstart');
            $(knob).unbind('mousedown');
            $(knob).animate({ opacity: 0 }, constants.animationTime);
            $(rate).animate({ opacity: 0.5 }, constants.animationTime);
            $(modes).animate({ opacity: 0.5 }, constants.animationTime);
            $(fan).animate({ opacity: 0.5 }, constants.animationTime);
            $(swingLR).animate({ opacity: 0.5 }, constants.animationTime);
            $(swingUD).animate({ opacity: 0.5 }, constants.animationTime);
            $(powerExt).animate({ opacity: 0 }, constants.animationTime);
            $(slider).css({
                "-webkit-mask-image": "",
                "mask-image": ""
            });
            $(fullSlider).animate({ opacity: 0 }, constants.animationTime);
            $(dialerInactive).animate({ opacity: 1 }, constants.animationTime);
            $(modes).off('click');
            $(fan).off('click');
            $(swingLR).off('click');
            $(swingUD).off('click');
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
            applianceUpdater(holder);
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
    sliderFill();
    adjuster();
    $(window).resize(function () {
        adjuster();
    });
    $(holder).mousedown(toggler);
    stateCoordinator();
    return invoker;
    function invoker(updates) {
        setter(updates['Dim Value'], true, true);
        switcher(updates.Status);
    }
    function sliderFill() {
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
    function setter(horizontalOffset, percent, external) {
        if (percent) {
            if ((horizontalOffset == Math.round($(holder).attr('value'))) && external) {
                return;
            }
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
            $(holder).attr('state', 'on');
        } else if ($(holder).attr('state') == 'on') {
            $(holder).attr('state', 'off');
        }
        applianceUpdater(holder);
    }
    function switcher(state) {
        $(holder).attr('state', 'switching');
        if (state) {
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
        } else {
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
            applianceUpdater(holder);
        }
    }
}
function staticLightManager(holder) {
    var symbol,
        name,
        litLight;
    lightGlow();
    adjuster();
    $(holder).mousedown(toggler);
    stateCoordinator();
    return invoker;
    function invoker(updates) {
        switcher(updates.Status);
    }
    function lightGlow() {
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
        if ($(holder).attr('state') == 'switching') {
            return;
        }
        if ($(holder).attr('state') == 'off') {
            $(holder).attr('state', 'on');
        } else if ($(holder).attr('state') == 'on') {
            $(holder).attr('state', 'off');
        }
        applianceUpdater(holder);
    }
    function switcher(state) {
        $(holder).attr('state', 'switching');
        if (state) {
            $(holder).css({
                "background-image": "linear-gradient(rgba(34, 111, 175, 0.7), rgba(57, 120, 181, 0.7))"
            });
            $(litLight).animate({ opacity: 1 }, constants.animationTime + constants.animationMaxDelay, function () {
                $(holder).attr('state', 'on');
            });
        } else {
            $(holder).css({
                "background-image": "linear-gradient(rgba(52, 64, 122, 0.3), rgba(53, 63, 121, 0.3))"
            });
            $(litLight).animate({ opacity: 0 }, constants.animationTime + constants.animationMaxDelay, function () {
                $(holder).attr('state', 'off');
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
    lightGlow();
    sliderFill();
    adjuster();
    $(window).resize(function () {
        adjuster();
    });
    $(holder).mousedown(toggler);
    stateCoordinator();
    return invoker;
    function invoker(updates) {
        setter(updates['Dim Value'], true, true);
        switcher(updates.Status);
    }
    function lightGlow() {
        $($(holder).children('img[type=symbol]')[0].outerHTML).insertAfter($(holder).children('img[type=symbol]')[0]);
        $($($(holder).children('img[type=symbol]')[0]).next('img')[0]).attr({
            'type': 'litLight',
            'src': 'Assets/Images/LitLight.png'
        });
        $($(holder).children('img[type=litLight]')[0]).css({
            'opacity': '0'
        });
    }
    function sliderFill() {
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
    function setter(horizontalOffset, percent, external) {
        if (percent) {
            if ((horizontalOffset == Math.round($(holder).attr('value'))) && external) {
                return;
            }
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
            if ($(holder).attr('state') == 'on') {
                $(litLight).css('opacity', horizontalOffset / 100);
            }
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
            $(holder).attr('state', 'on');
        } else if ($(holder).attr('state') == 'on') {
            $(holder).attr('state', 'off');
        }
        applianceUpdater(holder);
    }
    function switcher(state) {
        $(holder).attr('state', 'switching');
        if (state) {
            $(holder).css({
                "background-image": "linear-gradient(rgba(34, 111, 175, 0.7), rgba(57, 120, 181, 0.7))"
            });
            $(knob).animate({ opacity: 1 }, constants.animationTime, function () {
                dragManager();
            });
            $(litLight).animate({ opacity: ($(holder).attr('value') / 100) }, constants.animationTime);
            $(fullSlider).animate({ opacity: 1 }, constants.animationTime);
            $(rate).animate({ opacity: 1 }, constants.animationTime);
            $(slider).animate({ opacity: 1 }, constants.animationTime + constants.animationMaxDelay, function () {
                $(holder).attr('state', 'on');
            });
        } else {
            $(holder).css({
                "background-image": "linear-gradient(rgba(52, 64, 122, 0.3), rgba(53, 63, 121, 0.3))"
            });
            $(knob).unbind('touchstart');
            $(knob).unbind('mousedown');
            $(knob).animate({ opacity: 0 }, constants.animationTime);
            $(litLight).animate({ opacity: 0 }, constants.animationTime);
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
            $(document).mouseup(function () {
                endDrag();
            });
            $(document).on('touchend', function () {
                //endDrag();
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
            applianceUpdater(holder);
        }
    }
}
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
(function () {
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
            //$(a).css({
            //    'display': 'inline-block',
            //    'height': '10%',
            //    'position': 'absolute',
            //    'pointer- events': 'none'
            //});
            $(a).css({
                'position': 'absolute', 'top': '0', 'right': '0', 'bottom': '0', 'left': '0', 'width': '100%', 'height': '100%', 'display': 'inline-block'
            });
        });
    } else setTimeout(arguments.callee, constants.weatherLoadFailureRetryDelay);
    setTimeout(arguments.callee, constants.weatherUpdateInterval);
})();
