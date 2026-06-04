import {Stack, Typography} from "@mui/material";
import {useTranslation} from "../i18n.ts";

export default function TopForceStay(
    {
        lang,
        reasons
    } : {
        lang?: string;
        reasons?: string[];
    }
) {
    const t = useTranslation(lang);

    return (
        <Stack sx={{position: 'absolute', top: 15, alignItems: 'center'}}>
            <Typography variant="body2" component="p" color="error">
                {t['You are in force stay mode now, which means that it will never redirect to target link and you can make test on it.']}
            </Typography>
            {reasons && (
                reasons.map((reason, index) => (
                    <Typography variant="body2" component="p" color="error" key={index}>
                        {reason}
                    </Typography>
                ))
            )}
        </Stack>
    );
}
