// ############################################################################//
//                                                                             //
//    ... перезагрузить z2m, что бы конвертер применился                       //
//                                                                             //
//#############################################################################//


//const reporting = require('zigbee-herdsman-converters/lib/reporting');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;
const ea = exposes.access;
const {
    battery,
    binary,
    enumLookup,
    numeric,
	pressure,
    temperature,
	deviceEndpoints,
} = require('zigbee-herdsman-converters/lib/modernExtend');

const defaultReporting = {min: 0, max: 300, change: 0};
const normalReporting = {min: 0, max: 3600, change: 0};
const rareReporting = {min: 0, max: 21600, change: 0};
const rarestReporting = {min: 0, max: 64800, change: 0};
const oneReporting = {min: 45, max: 1800, change: 1};
const twoReporting = {min: 45, max: 1800, change: 10};
const threeReporting = {min: 30, max: 1800, change: 1};
const fourReporting = {min: 30, max: 1800, change: 10};
const fiveReporting = {min: 1800, max: 10600, change: 1};
const sixReporting = {min: 3600, max: 21600, change: 1};

const definition = {
        zigbeeModel: ['EFEKTA_PST_POW_V1_LR'],
        model: 'EFEKTA_PST_POW_V1_LR',
        vendor: 'EFEKTA',
        description: 'Water, gas smart pressure monitor with two types of power supply and signal amplifier',
        extend: [
            pressure({
                unit: 'kPa',
                description: 'Measured pressure value in kPa',
                scale: 10,
                reporting: threeReporting,
                access: 'STATE',
            }),
            numeric({
                name: 'bar',
                unit: 'bar',
                cluster: 'msPressureMeasurement',
                attribute: 'measuredValue',
                description: 'Measured pressure value in bar',
                scale: 1000,
                precision: 2,
                access: 'STATE',
            }),
            numeric({
                name: 'psi',
                unit: 'psi',
                cluster: 'msPressureMeasurement',
                attribute: 'measuredValue',
                description: 'Measured pressure value in psi',
                scale: 68.94757,
                precision: 2,
                access: 'STATE',
            }),
            temperature({
                reporting: fourReporting,
                access: 'STATE',
            }),
            numeric({
                name: 'pressure_offset',
                unit: 'kPa',
                valueMin: -100.0,
                valueMax: 100.0,
                cluster: 'msPressureMeasurement',
                attribute: {ID: 0x0210, type: 0x29},
                description: 'Adjust first pressure sensor',
				access: 'STATE_SET',
            }),
            numeric({
                name: 'raw_temperature_calibration',
                unit: 'raw unit',
                valueMin: -8192,
                valueMax: 8192,
                cluster: 'msTemperatureMeasurement',
                attribute: {ID: 0x0008, type: 0x29},
                description: 'Adjust first temperature sensor',
				access: 'STATE_SET',
            }),
			numeric({
                name: 'mains_voltage',
                unit: 'V',
                cluster: 'genPowerCfg',
				attribute: 'mainsVoltage',
                description: 'Mains voltage',
				scale: 10,
				precision: 1,
				access: 'STATE_GET',
            }),
            battery({
                percentage: true,
                lowStatus: true,
                voltage: false,
                percentageReporting: true,
                percentageReportingConfig: fiveReporting,
            }),
            numeric({
                name: 'uptime',
                unit: 'Hours',
                cluster: 'genTime',
                attribute: 'localTime',
                description: 'Uptime',
                access: 'STATE',
            }),
            numeric({
                name: 'reading_interval',
                unit: 'sec',
                valueMin: 10,
                valueMax: 360,
                cluster: 'genPowerCfg',
                attribute: {ID: 0x0201, type: 0x21},
                description: 'Setting the sensor reading interval in seconds, by default 10 seconds',
				access: 'STATE_SET',
            }),
            enumLookup({
                name: 'tx_radio_power',
                lookup: {'4dbm': 4, '19dbm': 19},
                cluster: 'genPowerCfg',
                attribute: {ID: 0x0236, type: 0x28},
                description: 'Set TX Radio Power, dbm',
				access: 'STATE_SET',
            }),
            binary({
                name: 'smart_sleep',
                valueOn: ['ON', 1],
                valueOff: ['OFF', 0],
                cluster: 'genPowerCfg',
                attribute: {ID: 0x0216, type: 0x10},
                description: 'Enable Smart Sleep, short wakeup every 2-7 seconds',
				access: 'STATE_SET',
            }),
            binary({
                name: 'config_report_enable',
                valueOn: ['ON', 1],
                valueOff: ['OFF', 0],
                cluster: 'genPowerCfg',
                attribute: {ID: 0x0275, type: 0x10},
                description: 'Enable reporting based on reporting configuration',
				access: 'STATE_SET',
            }),
            binary({
                name: 'comparison_previous_data',
                valueOn: ['ON', 1],
                valueOff: ['OFF', 0],
                cluster: 'genPowerCfg',
                attribute: {ID: 0x0205, type: 0x10},
                description: 'Enable сontrol of comparison with previous data',
				access: 'STATE_SET',
            }),
        ],
    };

module.exports = definition;