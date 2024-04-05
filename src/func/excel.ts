import * as XLSX from 'xlsx'

const s2ab = (s:any):ArrayBuffer => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i<s.length; i++){
        view[i] = s.charCodeAt(i) & 0xFF;
    }

    return buf;
}

export const exportToExcel = (data:any[],fileName:string) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");

    const wbout = XLSX.write(wb , {bookType:'xlsx', type:'binary'});

    const blob = new Blob([s2ab(wbout)], {type:'application/octet-stream'});

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);    
}

