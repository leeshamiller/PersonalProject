import React, { Component } from 'react';
import './Input.scss';

class Input extends Component {
    render() {
        return (
<div className="container">
	<div className="container__item">
		<form className="form">
			<input type="email" className="form__field" placeholder="Your E-Mail Address" />
		</form>
	</div>
    </div>
	

                )
            }
        }
        
        export default Input;
