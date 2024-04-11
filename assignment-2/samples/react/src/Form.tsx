import { FormProvider, useForm } from "react-hook-form";

import { Input } from "./components/Input";
import { Select } from "./components/Select";
import { prefectureList } from "./data/prefecture";

export const Form = () => {
    const methods = useForm({
        mode: "onChange",
    });

    function removeEmptyFields(data: { [x: string]: any }) {
        Object.keys(data).forEach((key) => {
            if (data[key] === "" || data[key] == null) {
                delete data[key];
            }
        });
    }

    const onSubmit = methods.handleSubmit((data: any) => {
        removeEmptyFields(data);
        console.log(data);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch("https://httpstat.us/201", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
                <div style={{ display: "grid", gridGap: 20, textAlign: "end" }}>
                    <Input
                        name="name"
                        label="氏名"
                        type="text"
                        id="name"
                        placeholder="(例)トレタ 太郎"
                        validation={{
                            required: {
                                value: true,
                                message: "入力してください",
                            },
                        }}
                    />
                    <Input
                        name="email"
                        label="Eメール"
                        type="text"
                        id="email"
                        placeholder="(例)yoyaku@toreta.in"
                        validation={{
                            required: {
                                value: true,
                                message: "入力してください",
                            },
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "正しいメールアドレスを入力してください",
                            },
                        }}
                    />
                    <Input
                        name="zip"
                        label="郵便番号"
                        type="text"
                        id="zip"
                        placeholder="(例)0000000"
                        validation={{
                            required: {
                                value: true,
                                message: "入力してください",
                            },
                            pattern: {
                                value: /^\d{7}$/,
                                message: "ハイフンを含めず半角数字で入力してください",
                            },
                        }}
                    />
                    <Select
                        name="prefecture"
                        label={"都道府県"}
                        id={"prefecture"}
                        placeholder={"選択してください"}
                        options={prefectureList}
                        validation={{
                            required: {
                                value: true,
                                message: "入力してください",
                            },
                        }}
                    />
                    <Input
                        name="address1"
                        label="市区町村・番地"
                        type="text"
                        id="address1"
                        placeholder="(例)品川区西五反田７丁目２２−１７"
                        validation={{
                            required: {
                                value: true,
                                message: "入力してください",
                            },
                        }}
                    />
                    <Input
                        name="address2"
                        label="建物名・号室"
                        type="text"
                        id="address2"
                        placeholder="(例)TOCビル 8F"
                        validation={{
                            required: false,
                        }}
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <button
                        type="submit"
                        disabled={!methods.formState.isValid}
                        onClick={onSubmit}
                        style={{
                            marginTop: 30,
                            width: 100,
                            paddingTop: 12,
                            paddingBottom: 12,
                            color: "#FFFFFF",
                            backgroundColor: "#5DD669",
                            opacity: methods.formState.isValid ? 1 : 0.5,
                            borderRadius: 10,
                        }}
                    >
                        登録
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};
