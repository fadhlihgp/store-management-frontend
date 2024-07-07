import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Trans {
  month: number,
  value: number
}

interface BarChartProp {
  transactionTotals: Trans[]
}

function BarChart(trans: BarChartProp){

    // const options = {
    //     responsive: true,
    //     plugins: {
    //       legend: {
    //         position: 'top',
    //       }
    //     },
    //   };

      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const data = {
        labels,
        datasets: [
          {
            label: 'Pemasukkan',
            // data: labels.map(() => { return Math.random() * 1000 + 500 }),
            data: trans.transactionTotals.map((trans) => trans.value),
            backgroundColor: 'rgba(53, 162, 235, 1)',
          },
        ],
      };

    return(
      <TitleCard title={"Pemasukkan"}>
            {/* <Bar data={data} options={options} /> */}\
            <Bar data={data} />
      </TitleCard>

    )
}


export default BarChart
