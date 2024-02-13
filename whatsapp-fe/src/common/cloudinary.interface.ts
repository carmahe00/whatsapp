export interface CloudinaryResponse {
    asset_id:          string;
    public_id:         string;
    version:           number;
    version_id:        string;
    signature:         string;
    resource_type:     string;
    created_at:        Date;
    tags:              any[];
    bytes:             number;
    type:              string;
    etag:              string;
    placeholder:       boolean;
    url:               string;
    secure_url:        string;
    folder:            string;
    access_mode:       string;
    original_filename: string;
}