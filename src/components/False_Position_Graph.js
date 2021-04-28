import React, { Component } from 'react';
import { range, compile } from 'mathjs';
import { Line } from 'react-chartjs-2';

export default class False_Position_Graph extends Component {
    render() {
        let { fx } = this.props;
        let { xl } = this.props;
        let { xr } = this.props;
        let { error } = this.props;
        let labels = range(xl, xr, 0.2).toArray();

        let datapoints = error;

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