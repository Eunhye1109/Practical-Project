import { createContext, ReactNode, useContext, useState } from "react";

interface DropdownContextType {
    selected: string[]; // 현재 선택 항목
    open: boolean; // 토글 열고 닫기
    setOpen: (open: boolean) => void; // 토글 열고 닫기
    mode: 'radio' | 'checkBox'; // 모드 선택
    itemSelected: (value: string) => void; // 항목 선택시 실행할 함수
}

interface Props {
    children: ReactNode;
    mode: 'radio' | 'checkBox'; // 모드 선택
    defaultSelected: string[];
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => {
    const context = useContext(DropdownContext);
    return context;
}

export const DropdownProvider = ({children, mode, defaultSelected}: Props) => {
    const [selected, setSelected] = useState<string[]>(defaultSelected);
    const [open, setOpen] = useState(false);

    const itemSelected = (value: string) => {
        if(mode === 'radio') {
            setSelected([value]);
        } else {
            setSelected(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
        }
    }

    return (
        <DropdownContext.Provider value={{selected, open, setOpen, mode, itemSelected}}>
            {children}
        </DropdownContext.Provider>
    )
}