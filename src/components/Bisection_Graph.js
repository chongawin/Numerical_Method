import React, { Component } from 'react';
import { range, compile, e } from 'mathjs';
import { Line } from 'react-chartjs-2';

export default class Bisection_Graph extends Component {
    render() {
        let { fx } = this.props;
        let { xl } = this.props;
        let { xr } = this.props;
        let { arr4 } = this.props;

        let labels = range(xl, xr, 0.04).toArray();
        let datapoints = arr4;

        return <div style={{ width: 585, height: 200 }}>
            <Line
                data={{
                    labels: labels,
                    datasets: [{
                        fill: false,
                        label: 'Error',
                        data: datapoints,
                        tension: 0.4,
                        borderColor: '#ce1212'
                    }]
                }}
                options={{
                    maintainAspectRatio: false,
                }}
            />
        </div>
    }
}