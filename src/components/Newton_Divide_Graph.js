import React, { Component } from 'react';
import { range, compile, e } from 'mathjs';
import { Line } from 'react-chartjs-2';

export default class Newton_Divide_Graph extends Component {
    render() {
        let { x0 } = this.props;
        let { x1 } = this.props;
        let { x2 } = this.props;
        let { x3 } = this.props;
        let { x4 } = this.props;
        let { x } = this.props;

        let { fx } = this.props;
        let { fx0 } = this.props;
        let { fx1 } = this.props;
        let { fx2 } = this.props;
        let { fx3 } = this.props;
        let { fx4 } = this.props;
        let a;

        let arr = [];
        arr.push(fx0);
        arr.push(fx1);
        arr.push(fx2);
        arr.push(fx3);
        arr.push(fx4);

        let arr2 = [];
        arr2.push(x);
        arr2.push(x0);
        arr2.push(x1);
        arr2.push(x2);
        arr2.push(x3);
        arr2.push(x4);
        arr2.sort();

        for (let i = 0; i < arr2.length; i++) {
            if (arr2[i] == x) {
                a = i;
                arr.splice(i, 0, fx);
            }
        }

        let labels = arr2;

        let datapoints = arr;

        return <div style={{ width: 480, height: 200 }}>
            <Line
                data={{
                    labels: labels,
                    datasets: [{
                        fill: false,
                        label: 'F(x)',
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