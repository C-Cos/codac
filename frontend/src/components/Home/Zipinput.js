import React from 'react';


export default class Zipinput extends React.Component {

    render () {
        return (
            <input maxLength="5" value={this.props.value} className="form-control" onChange={this.props.onChangeZipcode} required />

        )
      }
}