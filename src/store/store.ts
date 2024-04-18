import { configureStore } from '@reduxjs/toolkit';
import {
    authSlice,
    guestSlice,
    speakerSlice,
    permissionSlice,
    reportSlice,
    roleSlice,
    stageTypeSlice,
    thethSlice,
    eventSlice,
    staffSlice,
    attendanceSlice,
    availabilitySlice,
    requestSlice,


} from '.';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        permissions: permissionSlice.reducer,
        roles: roleSlice.reducer,
        staffs: staffSlice.reducer,
        guests: guestSlice.reducer,
        speakers: speakerSlice.reducer,
        events: eventSlice.reducer,
        stageTypes: stageTypeSlice.reducer,
        theths: thethSlice.reducer,
        reports: reportSlice.reducer,
        attendances: attendanceSlice.reducer,
        availabilities: availabilitySlice.reducer,
        requests: requestSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})