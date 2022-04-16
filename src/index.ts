import { TileLayer, TileLayerOptions } from "leaflet";

class Tianditu {
    /**
     * 天地图XYZ Tiles
     * 官方网站地图API说明:http://lbs.tianditu.gov.cn/server/MapService.html
     * 申请key(accesstoken):https://console.tianditu.gov.cn/api/key
     * subdomains: "01234567",
     * url:https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileRow={y}&TileCol={x}&tk={accessToken}
     * 图层说明:
     * 图层投影均为球面墨卡托投影(WGS84) EPSG3857 也就是vec_w中"w",vec_c中"c"为经纬度投影(CGCS2000?)
     * vec 矢量底图 Vector
     * cva 矢量注记 Chinese Vector Annotation
     * img 影像底图 Image
     * cia 影像注记 Chinese Imagery Annotation
     * ter 地形晕渲 Terrain
     * cta 地形注记 Chinese Terrain Annotation
     * eva 英文矢量注记 English Imagery Annotation
     * eia 英文影像注记 English Imagery Annotation
     * ibo 全球境界 International Borders
     */
    accessToken: string;
    private options: TileLayerOptions = {
        subdomains: "01234567",
        maxZoom: 20,
        attribution: 'Map Data &copy; <a href="https://www.tianditu.gov.cn">天地图</a>',
        accessToken: "",
    };
    private setAttribution(attr: string): TileLayerOptions {
        return {
            subdomains: "01234567",
            maxZoom: 20,
            attribution: `${attr}`,
            accessToken: `${this.accessToken}`,
        };
    }
    private urls = {
        host: "https://t{s}.tianditu.gov.cn",
        service: "wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0",
        tile: "&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileRow={y}&TileCol={x}&tk={accessToken}",
    };
    private tileUrls = {
        vec: `${this.urls.host}/vec_w/${this.urls.service}&LAYER=vec${this.urls.tile}`,
        cva: `${this.urls.host}/cva_w/${this.urls.service}&LAYER=cva${this.urls.tile}`,
        img: `${this.urls.host}/img_w/${this.urls.service}&LAYER=img${this.urls.tile}`,
        cia: `${this.urls.host}/cia_w/${this.urls.service}&LAYER=cia${this.urls.tile}`,
        ter: `${this.urls.host}/ter_w/${this.urls.service}&LAYER=ter${this.urls.tile}`,
        cta: `${this.urls.host}/cta_w/${this.urls.service}&LAYER=cta${this.urls.tile}`,
        eva: `${this.urls.host}/eva_w/${this.urls.service}&LAYER=eva${this.urls.tile}`,
        eia: `${this.urls.host}/eia_w/${this.urls.service}&LAYER=eia${this.urls.tile}`,
        ibo: `${this.urls.host}/ibo_w/${this.urls.service}&LAYER=ibo${this.urls.tile}`,
    };
    constructor(accessToken: string) {
        this.accessToken = accessToken;
        this.options.accessToken = accessToken;
    }
    //矢量底图
    vec() {
        return new TileLayer(this.tileUrls.vec, this.options);
    }
    //矢量注记
    cva() {
        return new TileLayer(this.tileUrls.cva, this.setAttribution(""));
    }
    //影像底图
    img() {
        return new TileLayer(this.tileUrls.img, this.options);
    }
    //影像注记
    cia() {
        return new TileLayer(this.tileUrls.cia, this.options);
    }
    //地形晕渲
    ter() {
        return new TileLayer(this.tileUrls.ter, this.options);
    }
    //地形注记
    cta() {
        return new TileLayer(this.tileUrls.cta, this.options);
    }
    //英文矢量注记
    eva() {
        return new TileLayer(this.tileUrls.eva, this.options);
    }
    //英文影像注记
    eia() {
        return new TileLayer(this.tileUrls.eia, this.options);
    }
    //全球境界
    ibo() {
        return new TileLayer(this.tileUrls.ibo, this.options);
    }
}

class GoogleMap {
    /**
     * 谷歌地图
     * url:http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}
     * subdomains:['mt0','mt1','mt2','mt3']
     * maxzoom:20
     * h = roads only
     * m = standard roadmap
     * p = terrain
     * r = somehow altered roadmap
     * s = satellite only 影像图
     * t = terrain only 地形图
     * y = hybrid
     *
     */
    private options: TileLayerOptions = {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        maxZoom: 20,
        attribution:
            'Map Data &copy; <a href="https://developers.google.com/maps">Google Maps</a>',
    };
    private getUrl(lyrs: string) {
        return `http://{s}.google.com/vt/lyrs=${lyrs}&x={x}&y={y}&z={z}`;
    }
    satellite() {
        return new TileLayer(this.getUrl("s"), this.options);
    }
}
class OSM {
    /**
     * OpenStreetMap
     * See:https://wiki.openstreetmap.org/wiki/Tile_servers
     * 标准地图:https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
     * subdomains:'abc' 默认
     */
    private tile_url: string = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    private options: TileLayerOptions = {
        maxZoom: 19,
        attribution:
            'Map Data &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>',
    };
    stand() {
        return new TileLayer(this.tile_url, this.options);
    }
}

export { Tianditu, GoogleMap, OSM };
