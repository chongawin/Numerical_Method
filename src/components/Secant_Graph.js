import React, { Component } from 'react';
import { range, compile } from 'mathjs';
import { Line } from 'react-chartjs-2';

export default class Secant_Graph extends Component {
    render() {
        let { fx } = this.props;
        let { x0 } = this.props;
        let { x1 } = this.props;
        let { xnew } = this.props;
        let labels = range(x0, x1, 0.02).toArray();

        let datapoints = xnew;

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