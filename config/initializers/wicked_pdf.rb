WickedPdf::config = {
    :exe_path         => 'C:/Program Files/wkhtmltopdf/wkhtmltopdf.exe',
    :wkhtmltopdf      => 'C:/Program Files/wkhtmltopdf', # path to binary
    :orientation      => 'Portrait', # default , Landscape
    :page_size        => 'Letter',
    :dpi              => '300',
    :print_media_type => true,
    :no_background    => true,
    :margin           => {:top    => 30, # default 10 (mm)
                          :bottom => 30,
                          :left   => 30,
                          :right  => 30},

}