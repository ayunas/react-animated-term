import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const cursor = <span className="Terminal-cursor" />
const prompt = <span className="Terminal-prompt">$ </span>

const renderLines = lines => {
  return lines.map(line => {
    return (
      <React.Fragment key={line.id}>
        <div className="terminal-block">
          {line.cmd ? prompt : ''}
          <p className="terminal-text">{line.text}</p>
          {line.current ? cursor : ''}
          <br />
        </div>
       
      </React.Fragment>
    )
  })
}

const getWindowStyle = (white) => {
  return classNames({
    'Terminal-window': true,
    'Terminal-window-white': white
  })
}

const getTerminalStyle = (code) => {
  return classNames({
    'Terminal-term': true,
    'Terminal-term-code': code
  })
}

const getButtonStyle = (type) => {
  return classNames({
    'Terminal-btn': true,
    'Terminal-btn-close': type === 'close',
    'Terminal-btn-minimize': type === 'minimize',
    'Terminal-btn-maximize': type === 'maximize'
  })
}

const getBodyStyle = (code) => {
  return classNames({
    'Terminal-body': true,
    'Terminal-body-animated': !code
  })
}

const getConsoleStyle = (code, white) => {
  return classNames({
    'Terminal-console': true,
    'Terminal-console-code': code,
    'Terminal-console-white': white
  })
}

const Terminal = ({ children, white, height, code }) => {
  return (
    <div className={getWindowStyle(white)}>
      <div className={getTerminalStyle(code)} style={height ? {height} : null}>
        <div className="Terminal-header">
          <span
            className={getButtonStyle('close')}
          />
          <span
            className={getButtonStyle('minimize')}
          />
          <span
            className={getButtonStyle('maximize')}
          />
        </div>
        <div className={getBodyStyle(code)}>
          <div className={getConsoleStyle(code, white)}>
            {code ? (
              <code className="Terminal-code">
                {children}
              </code>
            ) : (
              <div className="Terminal-code">
                {renderLines(children)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) 
}

Terminal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  white: PropTypes.bool,
  height: PropTypes.number,
  code : PropTypes.bool
}

export default Terminal
