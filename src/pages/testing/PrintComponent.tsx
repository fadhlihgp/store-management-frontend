import React, { useRef } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
// import jsPDF from 'jspdf';
// import html2canvas from "html2canvas";
// import { IPurchaseResponse } from '../../utils/interfaces';
// import moment from 'moment';

// const InvoiceTemplate = () => {
//   return(
//     <>
//     <div id='printableArea'>
//   <div className="py-4">
//     <div className="px-14 py-6">
//       <table className="w-full border-collapse border-spacing-0">
//         <tbody>
//           <tr>
//             <td className="w-full align-top">
//               <div>
//                 <img
//                   src="https://raw.githubusercontent.com/templid/email-templates/main/templid-dynamic-templates/invoice-02/brand-sample.png"
//                   className="h-12"
//                 />
//               </div>
//             </td>
//             <td className="align-top">
//               <div className="text-sm">
//                 <table className="border-collapse border-spacing-0">
//                   <tbody>
//                     <tr>
//                       <td className="border-r pr-4">
//                         <div>
//                           <p className="whitespace-nowrap text-slate-400 text-right">
//                             Date
//                           </p>
//                           <p className="whitespace-nowrap font-bold text-main text-right">
//                             April 26, 2023
//                           </p>
//                         </div>
//                       </td>
//                       <td className="pl-4">
//                         <div>
//                           <p className="whitespace-nowrap text-slate-400 text-right">
//                             Invoice #
//                           </p>
//                           <p className="whitespace-nowrap font-bold text-main text-right">
//                             BRA-00335
//                           </p>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <div className="bg-slate-100 px-14 py-6 text-sm">
//       <table className="w-full border-collapse border-spacing-0">
//         <tbody>
//           <tr>
//             <td className="w-1/2 align-top">
//               <div className="text-sm text-neutral-600">
//                 <p className="font-bold">Supplier Company INC</p>
//                 <p>Number: 23456789</p>
//                 <p>VAT: 23456789</p>
//                 <p>6622 Abshire Mills</p>
//                 <p>Port Orlofurt, 05820</p>
//                 <p>United States</p>
//               </div>
//             </td>
//             <td className="w-1/2 align-top text-right">
//               <div className="text-sm text-neutral-600">
//                 <p className="font-bold">Customer Company</p>
//                 <p>Number: 123456789</p>
//                 <p>VAT: 23456789</p>
//                 <p>9552 Vandervort Spurs</p>
//                 <p>Paradise, 43325</p>
//                 <p>United States</p>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <div className="px-14 py-10 text-sm text-neutral-700">
//       <table className="w-full border-collapse border-spacing-0">
//         <thead>
//           <tr>
//             <td className="border-b-2 border-main pb-3 pl-3 font-bold text-main">
//               #
//             </td>
//             <td className="border-b-2 border-main pb-3 pl-2 font-bold text-main">
//               Product details
//             </td>
//             <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">
//               Price
//             </td>
//             <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
//               Qty.
//             </td>
//             <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
//               VAT
//             </td>
//             <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">
//               Subtotal
//             </td>
//             <td className="border-b-2 border-main pb-3 pl-2 pr-3 text-right font-bold text-main">
//               Subtotal + VAT
//             </td>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border-b py-3 pl-3">1.</td>
//             <td className="border-b py-3 pl-2">Montly accountinc services</td>
//             <td className="border-b py-3 pl-2 text-right">$150.00</td>
//             <td className="border-b py-3 pl-2 text-center">1</td>
//             <td className="border-b py-3 pl-2 text-center">20%</td>
//             <td className="border-b py-3 pl-2 text-right">$150.00</td>
//             <td className="border-b py-3 pl-2 pr-3 text-right">$180.00</td>
//           </tr>
//           <tr>
//             <td className="border-b py-3 pl-3">2.</td>
//             <td className="border-b py-3 pl-2">Taxation consulting (hour)</td>
//             <td className="border-b py-3 pl-2 text-right">$60.00</td>
//             <td className="border-b py-3 pl-2 text-center">2</td>
//             <td className="border-b py-3 pl-2 text-center">20%</td>
//             <td className="border-b py-3 pl-2 text-right">$120.00</td>
//             <td className="border-b py-3 pl-2 pr-3 text-right">$144.00</td>
//           </tr>
//           <tr>
//             <td className="border-b py-3 pl-3">3.</td>
//             <td className="border-b py-3 pl-2">Bookkeeping services</td>
//             <td className="border-b py-3 pl-2 text-right">$50.00</td>
//             <td className="border-b py-3 pl-2 text-center">1</td>
//             <td className="border-b py-3 pl-2 text-center">20%</td>
//             <td className="border-b py-3 pl-2 text-right">$50.00</td>
//             <td className="border-b py-3 pl-2 pr-3 text-right">$60.00</td>
//           </tr>
//           <tr>
//             <td colSpan={7}>
//               <table className="w-full border-collapse border-spacing-0">
//                 <tbody>
//                   <tr>
//                     <td className="w-full" />
//                     <td>
//                       <table className="w-full border-collapse border-spacing-0">
//                         <tbody>
//                           <tr>
//                             <td className="border-b p-3">
//                               <div className="whitespace-nowrap text-slate-400">
//                                 Net total:
//                               </div>
//                             </td>
//                             <td className="border-b p-3 text-right">
//                               <div className="whitespace-nowrap font-bold text-main">
//                                 $320.00
//                               </div>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="p-3">
//                               <div className="whitespace-nowrap text-slate-400">
//                                 VAT total:
//                               </div>
//                             </td>
//                             <td className="p-3 text-right">
//                               <div className="whitespace-nowrap font-bold text-main">
//                                 $64.00
//                               </div>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="bg-main p-3">
//                               <div className="whitespace-nowrap font-bold text-white">
//                                 Total:
//                               </div>
//                             </td>
//                             <td className="bg-main p-3 text-right">
//                               <div className="whitespace-nowrap font-bold text-white">
//                                 $384.00
//                               </div>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <div className="px-14 text-sm text-neutral-700">
//       <p className="text-main font-bold">PAYMENT DETAILS</p>
//       <p>Banks of Banks</p>
//       <p>Bank/Sort Code: 1234567</p>
//       <p>Account Number: 123456678</p>
//       <p>Payment Reference: BRA-00335</p>
//     </div>
//     <div className="px-14 py-10 text-sm text-neutral-700">
//       <p className="text-main font-bold">Notes</p>
//       <footer className="fixed bottom-0 left-0 bg-slate-100 w-full text-neutral-600 text-center text-xs py-3">
//         Supplier Company
//         <span className="text-slate-300 px-2">|</span>
//         info@company.com
//         <span className="text-slate-300 px-2">|</span>
//         +1-202-555-0106
//       </footer>
//     </div>
//   </div>
// </div>

//     </>
//   )
// }

// interface InvoiceData {
//   invoice: string
//   date: Date
//   customer: string
//   createdBy: string
//   purchaseType: string
// }

// interface InvoiceProps {
//   data: IPurchaseResponse
// }

const InvoicePrint = () => {
  return (
    <div>
  <div className="py-4">
    <div className="px-14 py-6">
      <table className="w-full border-collapse border-spacing-0">
        <tbody>
          <tr>
            <td className="w-full align-top">
              <div>
                <img
                  src="https://raw.githubusercontent.com/templid/email-templates/main/templid-dynamic-templates/invoice-02/brand-sample.png"
                  className="h-12"
                />
              </div>
            </td>
            <td className="align-top">
              <div className="text-sm">
                <table className="border-collapse border-spacing-0">
                  <tbody>
                    <tr>
                      <td className="border-r pr-4">
                        <div>
                          <p className="whitespace-nowrap text-slate-400 text-right">
                            Date
                          </p>
                          <p className="whitespace-nowrap font-bold text-main text-right">
                            April 26, 2023
                          </p>
                        </div>
                      </td>
                      <td className="pl-4">
                        <div>
                          <p className="whitespace-nowrap text-slate-400 text-right">
                            Invoice #
                          </p>
                          <p className="whitespace-nowrap font-bold text-main text-right">
                            BRA-00335
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="bg-slate-100 px-14 py-6 text-sm">
      <table className="w-full border-collapse border-spacing-0">
        <tbody>
          <tr>
            <td className="w-1/2 align-top">
              <div className="text-sm text-neutral-600">
                <p className="font-bold">Supplier Company INC</p>
                <p>Number: 23456789</p>
                <p>VAT: 23456789</p>
                <p>6622 Abshire Mills</p>
                <p>Port Orlofurt, 05820</p>
                <p>United States</p>
              </div>
            </td>
            <td className="w-1/2 align-top text-right">
              <div className="text-sm text-neutral-600">
                <p className="font-bold">Customer Company</p>
                <p>Number: 123456789</p>
                <p>VAT: 23456789</p>
                <p>9552 Vandervort Spurs</p>
                <p>Paradise, 43325</p>
                <p>United States</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="px-14 py-10 text-sm text-neutral-700">
      <table className="w-full border-collapse border-spacing-0">
        <thead>
          <tr>
            <td className="border-b-2 border-main pb-3 pl-3 font-bold text-main">
              #
            </td>
            <td className="border-b-2 border-main pb-3 pl-2 font-bold text-main">
              Product details
            </td>
            <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">
              Price
            </td>
            <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
              Qty.
            </td>
            <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
              VAT
            </td>
            <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">
              Subtotal
            </td>
            <td className="border-b-2 border-main pb-3 pl-2 pr-3 text-right font-bold text-main">
              Subtotal + VAT
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b py-3 pl-3">1.</td>
            <td className="border-b py-3 pl-2">Montly accountinc services</td>
            <td className="border-b py-3 pl-2 text-right">$150.00</td>
            <td className="border-b py-3 pl-2 text-center">1</td>
            <td className="border-b py-3 pl-2 text-center">20%</td>
            <td className="border-b py-3 pl-2 text-right">$150.00</td>
            <td className="border-b py-3 pl-2 pr-3 text-right">$180.00</td>
          </tr>
          <tr>
            <td className="border-b py-3 pl-3">2.</td>
            <td className="border-b py-3 pl-2">Taxation consulting (hour)</td>
            <td className="border-b py-3 pl-2 text-right">$60.00</td>
            <td className="border-b py-3 pl-2 text-center">2</td>
            <td className="border-b py-3 pl-2 text-center">20%</td>
            <td className="border-b py-3 pl-2 text-right">$120.00</td>
            <td className="border-b py-3 pl-2 pr-3 text-right">$144.00</td>
          </tr>
          <tr>
            <td className="border-b py-3 pl-3">3.</td>
            <td className="border-b py-3 pl-2">Bookkeeping services</td>
            <td className="border-b py-3 pl-2 text-right">$50.00</td>
            <td className="border-b py-3 pl-2 text-center">1</td>
            <td className="border-b py-3 pl-2 text-center">20%</td>
            <td className="border-b py-3 pl-2 text-right">$50.00</td>
            <td className="border-b py-3 pl-2 pr-3 text-right">$60.00</td>
          </tr>
          <tr>
            <td colSpan={7}>
              <table className="w-full border-collapse border-spacing-0">
                <tbody>
                  <tr>
                    <td className="w-full" />
                    <td>
                      <table className="w-full border-collapse border-spacing-0">
                        <tbody>
                          <tr>
                            <td className="border-b p-3">
                              <div className="whitespace-nowrap text-slate-400">
                                Net total:
                              </div>
                            </td>
                            <td className="border-b p-3 text-right">
                              <div className="whitespace-nowrap font-bold text-main">
                                $320.00
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3">
                              <div className="whitespace-nowrap text-slate-400">
                                VAT total:
                              </div>
                            </td>
                            <td className="p-3 text-right">
                              <div className="whitespace-nowrap font-bold text-main">
                                $64.00
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="bg-main p-3">
                              <div className="whitespace-nowrap font-bold text-white">
                                Total:
                              </div>
                            </td>
                            <td className="bg-main p-3 text-right">
                              <div className="whitespace-nowrap font-bold text-white">
                                $384.00
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="px-14 text-sm text-neutral-700">
      <p className="text-main font-bold">PAYMENT DETAILS</p>
      <p>Banks of Banks</p>
      <p>Bank/Sort Code: 1234567</p>
      <p>Account Number: 123456678</p>
      <p>Payment Reference: BRA-00335</p>
    </div>
    <div className="px-14 py-10 text-sm text-neutral-700">
      <p className="text-main font-bold">Notes</p>
      <p className="italic">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </p>
      <footer className="fixed bottom-0 left-0 bg-slate-100 w-full text-neutral-600 text-center text-xs py-3">
        Supplier Company
        <span className="text-slate-300 px-2">|</span>
        info@company.com
        <span className="text-slate-300 px-2">|</span>
        +1-202-555-0106
      </footer>
    </div>
  </div>
</div>

  )
}
// const data = {
//     name: 'John Doe',
//     age: 30,
//     profession: 'Developer',
//     // Data lainnya
//   };


const PrintComponent: React.FC = () => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const handlePrint2 = async () => {
  //   const input = document.getElementById('printableArea');
  //   if (input) {
  //     // const canvas = await html2canvas(input);
  //     // const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     // pdf.addImage(imgData, 'PNG', 0, 0);
  //     pdf.save('download.pdf');
  //   }
  // };

  // const handleGeneratePDF = () => {
  //   const pdf = new jsPDF();
  //   // pdf.html(JSON.stringify(data), {
  //   //   html2canvas: { scale: 2 },
  //   //   margin: 1,
  //   //   windowWidth: 1000
  //   // });
  //   // pdf.text(JSON.stringify(data, null, 2), 10, 10);
    
  //   pdf.save('data.pdf');
  // };

  const pdfRef = useRef<HTMLDivElement>(null);
//   const downloadPdf = () => {
//     const input = pdfRef.current;
//     if (input) {
//         html2canvas(input).then(canvas => {
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF();
//             pdf.addImage(imgData, 'PNG', 0, 0);
//             pdf.save('download.pdf');
//         });
//     }
// };

  return (
    <div>
      <button onClick={handlePrint}>Print</button> <br/>
      {/* <button onClick={handleGeneratePDF}>Generate PDF</button> */}

      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          {/* Komponen atau tampilan yang akan dicetak */}
          <pre>
            <InvoicePrint />
          </pre>
        </div>
      </div>

      <div>
            <div ref={pdfRef} style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
                <h1>Judul PDF</h1>
                <p>Ini adalah contoh konten untuk di-download sebagai PDF.</p>
            </div>
            {/* <button onClick={downloadPdf}>Download PDF</button> */}
        </div>

      <ReactToPrint
        trigger={() => <button>Cetak ke PDF</button>}
        content={() => componentRef.current}
      />
    </div>
  );
};

export default PrintComponent;
