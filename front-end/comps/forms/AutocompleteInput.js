import { Select, Spin } from 'antd';
import React, { useRef, useState } from 'react';
import debounce from 'lodash/debounce';

const AutocompleteInput = ({ value, onChange, fetchOptions, placeholder = "" }) => {
    const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
        const [fetching, setFetching] = useState(false);
        const [options, setOptions] = useState([]);
        const fetchRef = useRef(0);
        const debounceFetcher = React.useMemo(() => {
            const loadOptions = (value) => {
                fetchRef.current += 1;
                const fetchId = fetchRef.current;
                setOptions([]);
                setFetching(true);
                fetchOptions(value).then((newOptions) => {
                    if (fetchId !== fetchRef.current) {
                        // for fetch callback order
                        return;
                    }

                    setOptions(newOptions);
                    setFetching(false);
                });
            };

            return debounce(loadOptions, debounceTimeout);
        }, [fetchOptions, debounceTimeout]);
        return (
            <Select
                labelInValue
                filterOption={false}
                onSearch={debounceFetcher}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                {...props}
                options={options}
            />
        );
    }

    return (
        <DebounceSelect
            showSearch
            value={value}
            placeholder={placeholder}
            fetchOptions={fetchOptions}
            onChange={onChange}
            style={{
                width: '100%',
            }}
        />
    );
};

export default AutocompleteInput;

