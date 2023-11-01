import './stopCheckbox.scss'

type Props = {
    check:boolean
    HandleCheckbox:(event: React.ChangeEvent<HTMLInputElement>) => void
}

export const StopCheckbox = ({check,HandleCheckbox}:Props) =>{
    return (
        <div className='divCheckbox'>
            <label className="checkboxlabel">
                <input 
                    className="checkboxList"
                    type="checkbox" 
                    checked={check} 
                    onChange={HandleCheckbox}                        
                    />  
                {check ? '시작' :'스탑'}
            </label>
        </div>
    );
}