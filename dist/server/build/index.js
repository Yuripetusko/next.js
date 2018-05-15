'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _regenerator = require('babel-runtime/regenerator')

var _regenerator2 = _interopRequireDefault(_regenerator)

var _promise = require('babel-runtime/core-js/promise')

var _promise2 = _interopRequireDefault(_promise)

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator')

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2)

var writeBuildId = (function () {
  var _ref3 = (0, _asyncToGenerator3.default)(/* #__PURE__ */_regenerator2.default.mark(function _callee3 (dir, buildId, config) {
    var buildIdPath
    return _regenerator2.default.wrap(function _callee3$ (_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            buildIdPath = (0, _path.join)(dir, config.distDir, 'BUILD_ID')
            _context3.next = 3
            return _fs2.default.writeFile(buildIdPath, buildId, 'utf8')

          case 3:
          case 'end':
            return _context3.stop()
        }
      }
    }, _callee3, this)
  }))

  return function writeBuildId (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments)
  }
}())

var _path = require('path')

var _fs = require('mz/fs')

var _fs2 = _interopRequireDefault(_fs)

var _uuid = require('uuid')

var _uuid2 = _interopRequireDefault(_uuid)

var _webpack = require('webpack')

var _webpack2 = _interopRequireDefault(_webpack)

var _config = require('../config')

var _config2 = _interopRequireDefault(_config)

var _constants = require('../../lib/constants')

var _webpack3 = require('./webpack')

var _webpack4 = _interopRequireDefault(_webpack3)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

exports.default = (function () {
  var _ref = (0, _asyncToGenerator3.default)(/* #__PURE__ */_regenerator2.default.mark(function _callee (dir) {
    var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null
    var config, buildId, configs
    return _regenerator2.default.wrap(function _callee$ (_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = (0, _config2.default)(_constants.PHASE_PRODUCTION_BUILD, dir, conf)
            buildId = _uuid2.default.v4()
            _context.prev = 2
            _context.next = 5
            return _fs2.default.access(dir, _fs2.default.constants.W_OK)

          case 5:
            _context.next = 11
            break

          case 7:
            _context.prev = 7
            _context.t0 = _context['catch'](2)

            console.error('> Failed, build directory is not writeable. https://err.sh/zeit/next.js/build-dir-not-writeable')
            throw _context.t0

          case 11:
            _context.prev = 11
            _context.next = 14
            return _promise2.default.all([(0, _webpack4.default)(dir, { buildId: buildId, isServer: false, config: config }), (0, _webpack4.default)(dir, { buildId: buildId, isServer: true, config: config })])

          case 14:
            configs = _context.sent
            _context.next = 17
            return runCompiler(configs)

          case 17:
            _context.next = 19
            return writeBuildId(dir, buildId, config)

          case 19:
            _context.next = 25
            break

          case 21:
            _context.prev = 21
            _context.t1 = _context['catch'](11)

            console.error('> Failed to build')
            throw _context.t1

          case 25:
          case 'end':
            return _context.stop()
        }
      }
    }, _callee, this, [[2, 7], [11, 21]])
  }))

  function build (_x2) {
    return _ref.apply(this, arguments)
  }

  return build
}())

function runCompiler (compiler) {
  var _this = this

  return new _promise2.default(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(/* #__PURE__ */_regenerator2.default.mark(function _callee2 (resolve, reject) {
      var webpackCompiler
      return _regenerator2.default.wrap(function _callee2$ (_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = _webpack2.default
              _context2.next = 3
              return compiler

            case 3:
              _context2.t1 = _context2.sent
              _context2.next = 6
              return (0, _context2.t0)(_context2.t1)

            case 6:
              webpackCompiler = _context2.sent

              webpackCompiler.run(function (err, stats) {
                if (err) return reject(err)

                var jsonStats = stats.toJson()

                if (jsonStats.errors.length > 0) {
                  var error = new Error(jsonStats.errors[0])
                  error.errors = jsonStats.errors
                  error.warnings = jsonStats.warnings
                  return reject(error)
                }

                resolve(jsonStats)
              })

            case 8:
            case 'end':
              return _context2.stop()
          }
        }
      }, _callee2, _this)
    }))

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments)
    }
  }())
}
