<?php

function BubbleSort(array $container)
{
    $count = count($container);
    for ($j = 1; $j < $count; $j++) {
        for ($i = 0; $i < $count - $j; $i++) {
            $temp = $container[$i];
        }
    }
}
