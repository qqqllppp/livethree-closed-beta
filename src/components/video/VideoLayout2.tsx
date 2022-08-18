import { useVideo, useHMSStore, selectCameraStreamByPeerID } from '@100mslive/react-sdk';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const VideoLayout2 = ({ peerLocal, peerRemote, maxWidth }: any) => {

    const { videoRef: videoRefLocal } = useVideo({ trackId: peerLocal.videoTrack });
    const { videoRef: videoRefRemote } = useVideo({ trackId: peerRemote.videoTrack });
    // TODO: try absolute, top:0, bottom:0 to get rid of weird bars
    const videoTrackLocal = useHMSStore(selectCameraStreamByPeerID(peerLocal.id));
    const videoTrackRemote = useHMSStore(selectCameraStreamByPeerID(peerRemote.id));

    return (
        <Box sx={ { width: "100%", height: "auto", backgroundColor: "black", position: "relative" } }>
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={ { width: "100%", height: "auto" } }
            >
                <Grid item xs={ 10 }>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={ { width: "100%", height: "auto" } }
                    >
                        { videoTrackRemote?.enabled ? (
                            <video
                                style={ { width: "100%", height: "auto", maxWidth: maxWidth } }
                                ref={ videoRefRemote }
                                autoPlay
                                muted
                                playsInline
                            />
                        ) : (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={ { width: "100%", pb: "56.25%", backgroundColor: "#22272E" } }
                            >
                                <Typography color="white" align="right" sx={ { width: "100%", p: 1 } }>{ peerRemote.name }</Typography>
                            </Box>
                        ) }
                        {/* <Typography sx={ { position: "absolute", top: 0, right: 0, pr: 1 } }>{ peerRemote.name }</Typography> */ }
                    </Stack>
                    {/* stack removes space at bottom */ }
                </Grid>

                <Grid
                    item
                    xs={ 2 }
                >
                    { videoTrackLocal?.enabled ? (
                        <video
                            style={ { width: "100%", height: "auto", maxWidth: maxWidth } }
                            ref={ videoRefLocal }
                            autoPlay
                            muted
                            playsInline
                        />
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={ { width: "100%", pb: "56.25%", backgroundColor: "#22272E" } }
                        >
                            <Typography color="white">{ peerLocal.name }</Typography>
                        </Box>
                    ) }
                    {/* <Typography sx={ { position: "absolute", top: 0, right: 0, pt: 1, pr: 2 } }>{ peerLocal.name }</Typography> */ }
                </Grid>
            </Grid>
        </Box >
    )
}
