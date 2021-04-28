import React, { Component } from 'react';
import { range, compile } from 'mathjs';
import { Line } from 'react-chartjs-2';

export default class One_Point_Iteration_Graph extends Component {
    render() {
        let { fx } = this.props;
        let { start } = this.props;
        let { error } = this.props;
        let labels = range(start, start+error.length).toArray();

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