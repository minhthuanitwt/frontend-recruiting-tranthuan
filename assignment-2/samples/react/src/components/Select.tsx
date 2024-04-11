import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import React, { FC } from "react";

type Props = {
    name: string;
    label: string;
    id: string;
    placeholder: string;
    options: string[];
    validation: RegisterOptions<FieldValues, string> | undefined;
};

export const Select: FC<Props> = ({ name, label, id, options }) => {
    const { register } = useFormContext();

    return (
        <div>
            <label htmlFor={id} style={{ fontWeight: "bold", fontSize: 12 }}>
                {label}
            </label>
            <select
                style={{
                    width: 244,
                    fontSize: 12,
                    marginLeft: 10,
                    padding: 5,
                    borderRadius: 5,
                    borderColor: "#E2E2E2",
                }}
                {...register(name)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};
